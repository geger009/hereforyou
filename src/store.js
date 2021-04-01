import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		navState: false,
		onTop: true,
		onHome: true,
		userEmail: null,
		user: null,
		loading: false,
		authError: null,
		userTmpRole: null,
		fetchVolunteers: false,
		volunteers: null,
		fetchOrganizations: false,
		organizations: null,
		fetchActivities: false,
		activities: null,
		activity: null,
		fetchVolunteerReq: false,
		volunteerReq: null,
		fetchOrganizationsReq: false,
		organizationsReq: null,
		fetchNotifications: false,
		notifications: null,
		snackbars: {
			color: "warning",
			active: false,
			message: ''
		}
	},
	mutations: {
		resetAll (state) {
			state.navState = false;
			state.onTop = true;
			state.onHome = true;
			state.userEmail = null;
			state.user = null;
			state.loading = false;
			state.authError = null;
			state.userTmpRole = null;
			state.volunteers = null;
			state.organizations = null;
			state.activities = null;
			state.activity = null;
			state.volunteerReq = null;
			state.organizationsReq = null;
			state.notifications = null;
		},
		OpenAndCloseNav (state) {
			state.navState = !state.navState;
		},
		CheckOnTop (state, payload) {
			state.onTop = payload.value;
		},
		RouteHome (state, payload) {
			state.onHome = payload.value;
		},
		setSnackbars (state, payload) {
			state.snackbars.active = payload.active;
			state.snackbars.color = payload.color;
			state.snackbars.message = payload.message;
		},
		resetSnackbars (state) {
			state.snackbars.active = false;
			state.snackbars.color = "warning";
			state.snackbars.message = '';
		},
		setUserEmail (state, payload) {
			state.userEmail = payload.email;
		},
		clearUserEmail (state) {
			state.userEmail = null;
		},
		setUser (state, payload) {
			state.user = payload;
		},
		clearUser (state) {
			state.user = null;
		},
		updateUser (state, payload) {
			for (let key in payload) {
				state.user[key] = payload[key];
			}
		},
		setLoading (state, payload) {
			state.loading = payload;
		},
		setAuthError (state, payload) {
			state.authError = payload;
		},
		clearAuthError (state) {
			state.authError = null;
		},
		setRoleTemp (state, payload) {
			state.userTmpRole = payload;
		},
		setFetchVolunteers (state) {
			state.fetchVolunteers = true;
		},
		clearFetchVolunteers (state) {
			state.fetchVolunteers = false;
		},
		setVolunteers (state, payload) {
			state.volunteers = payload;
		},
		clearVolunteers (state) {
			state.volunteers = null;
		},
		setFetchOrganizations (state) {
			state.fetchOrganizations = true;
		},
		clearFetchOrganizations (state) {
			state.fetchOrganizations = false;
		},
		setOrganizations (state, payload) {
			state.organizations = payload;
		},
		clearOrganizations (state) {
			state.organizations = null;
		},
		setFetchActivities (state) {
			state.fetchActivities = true;
		},
		clearFetchActivities (state) {
			state.fetchActivities = false;
		},
		setActivities (state, payload) {
			state.activities = payload;
		},
		clearActivities (state) {
			state.activities = null;
		},
		setActivity (state, payload) {
			state.activity = payload;
		},
		clearActivity (state) {
			state.activity = null;
		},
		setFetchVolunteerReq (state) {
			state.fetchVolunteerReq = true;
		},
		clearFetchVolunteerReq (state) {
			state.fetchVolunteerReq = false;
		},
		setVolunteerReq (state, payload) {
			state.volunteerReq = payload;
		},
		clearVolunteerReq (state) {
			state.volunteerReq = null;
		},
		setFetchOrganizationsReq (state) {
			state.fetchOrganizationsReq = true;
		},
		clearFetchOrganizationsReq (state) {
			state.fetchOrganizationsReq = false;
		},
		setOrganizationsReq (state, payload) {
			state.organizationsReq = payload;
		},
		clearOrganizationsReq (state) {
			state.organizationsReq = null;
		},
		setFetchNotifications (state) {
			state.fetchNotifications = true;
		},
		clearFetchNotifications (state) {
			state.fetchNotifications = false;
		},
		setNotifications (state, payload) {
			state.notifications = payload;
		},
		clearNotifications (state) {
			state.notifications = null;
		}
	},
	actions: {
		OpenAndCloseNav ({ commit }) {
			commit('OpenAndCloseNav');
		},
		CheckOnTop({ commit }, payload) {
			commit('CheckOnTop', payload);
		},
		SignUpUser({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearAuthError');
			firebase.auth()
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(
				data => {
					let userData = data.user;

					commit('setUserEmail', { email: userData.email })

					userData.updateProfile({
						displayName: payload.role
					})
					.then(
						() => {
							let data = {
								uid: userData.uid,
								role: payload.role,
								name: payload.name,
								email: userData.email,
								gender: 'empty',
								profesi: 'empty',
								bornDate: 'empty',
								description: 'empty',
								province: 'empty',
								city: 'empty',
								address: 'empty',
								phones: 'empty',
								interests: 'empty',
								profilePicture: 'https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fdefault_profile.jpg?alt=media&token=1f0f6637-74fd-4a48-9fa9-41e644685338',
								appreciation: 0,
								activities: 'empty',
								created_at: new Date().toISOString().substr(0, 10)
							}

							firebase.database().ref('users_data').push(data)
							.then(
								data => {
									commit('setRoleTemp', payload.role);

									const key = data.key;

									dispatch('SetUserNotification', {
										id: key,
										notif: []
									});

									userData.sendEmailVerification({
										url: 'https://hereforyou-5044b.firebaseapp.com/login'
									})
									.then(
										() => {
											commit('setLoading', false);
											firebase.auth().signOut()
											.then(
												() => {
													commit('resetAll');
													router.push('/verification');
												}
											)
										}
									)
									.catch(
										error => {
											commit('setLoading', false);
											commit('setAuthError', error);
											firebase.auth().signOut();
										}
									)
								}
							)
							.catch(
								error => {
									commit('setLoading', false);
									commit('setAuthError', error);
									firebase.auth().signOut();
								}
							)
						}
					)
					.catch(
						error => {
							commit('setLoading', false);
							commit('setAuthError', error);
							firebase.auth().signOut();
						}
					)
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setAuthError', error);
					firebase.auth().signOut();
				}
			)
		},
		SignUpOrganization({ commit }, payload) {
			commit('setLoading', true);
			commit('clearAuthError');
			firebase.auth()
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(
				data => {
					let userData = data.user;

					commit('setUserEmail', { email: userData.email })

					userData.updateProfile({
						displayName: payload.role
					})
					.then(
						() => {
							let data = {
								uid: userData.uid,
								role: payload.role,
								name: payload.name,
								email: userData.email,
								description: payload.description,
								province: payload.province,
								city: payload.city,
								address: payload.address,
								phones: payload.phones,
								status: 'pending',
								created_at: new Date().toISOString().substr(0, 10)
							}
							firebase.database().ref('organization_request').push(data)
							.then(
								() => {
									commit('setLoading', false);
									commit('setRoleTemp', payload.role);
									router.push('/verification');
									firebase.auth().signOut()
									.then(
										() => {
											commit('resetAll');
											router.push('/verification');
										}
									)
								}
							)
							.catch(
								error => {
									commit('setLoading', false);
									commit('setAuthError', error);
									firebase.auth().signOut();
								}
							)
						}
					)
					.catch(
						error => {
							commit('setLoading', false);
							commit('setAuthError', error);
							firebase.auth().signOut();
						}
					)
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setAuthError', error);
					firebase.auth().signOut();
				}
			)
		},
		SendVerification() {
			commit('setLoading', true);
			commit('clearAuthError');
			let userData = firebase.auth().currentUser;
			if (!userData.emailVerified) {
				if (userData.displayName === 'volunteer') {
					userData.sendEmailVerification({
						url: 'https://hereforyou-5044b.firebaseapp.com/login'
					})
					.then(
						() => {
							commit('setLoading', false);
							commit('setSnackbars', {
								active: true,
								color: "warning",
								message: 'Silakan cek kotak masuk email Anda.'
							});

							router.push('/verification');
						}
					)
					.catch(
						error => {
							commit('setLoading', false);
							
							commit('setSnackbars', {
								active: true,
								color: "error",
								message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
							});
						}
					)
				}
			} else {
				router.push('/login');
			}
		},
		SignInUser({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearAuthError');
			firebase.auth()
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then(
				data => {
					let userData = data.user;
					
					if (!userData.emailVerified) {
						if (userData.displayName === 'volunteer') {
							commit('setAuthError', { message: 'This email is not verified. Please verify this email and try again.' });
							return;
						} else if (userData.displayName === 'organization') {
							const orgVerifyDB = firebase.database().ref('organization_request');
							orgVerifyDB.orderByChild('uid').equalTo(userData.uid).once('value')
							.then(
								data => {
									let orgStatus = '';
									const orgObj = data.val();

									for (let key in orgObj) {
										orgStatus = orgObj[key].status;
									}

									if (orgStatus === 'accept') {
										userData.updateProfile({
											emailVerified: true
										})
										.then(
											data => {
												let newUser = {};
												const obj = data.val();
												
												for (let key in obj) {
													newUser = {
														id: key,
														uid: obj[key].uid,
														role: obj[key].role,
														name: obj[key].name,
														email: obj[key].email,
														bornDate: obj[key].bornDate,
														adminName: obj[key].adminName,
														adminEmail: obj[key].adminEmail,
														description: obj[key].description,
														province: obj[key].province,
														city: obj[key].city,
														address: obj[key].address,
														phones: obj[key].phones,
														website: obj[key].website,
														interests: obj[key].interests,
														profilePicture: obj[key].profilePicture,
														appreciation: obj[key].appreciation,
														activities: obj[key].activities,
													}
												}
				
												commit('setLoading', false);
												commit('setUser', newUser);
											}
										)
										.catch(
											error => {
												commit('setLoading', false);
												commit('setAuthError', error);
											}
										)
									} else if (orgStatus === 'reject') {
										commit('setAuthError', { message: 'This email is rejected by admin.' });
										return;
									} else {
										commit('setAuthError', { message: 'This email is not verified by admin. Please try again later.' });
										return;
									}
								}
							)
							.catch(
								error => {
									commit('setLoading', false);
									commit('setAuthError', error);
								}
							)
						}
					} else {
						const userDB = firebase.database().ref('users_data');
						userDB.orderByChild('uid').equalTo(userData.uid).once('value')
						.then(
							data => {
								let newUser = {};
								const obj = data.val();
								
								if (userData.displayName === 'volunteer') {
									for (let key in obj) {
										newUser = {
											id: key,
											uid: obj[key].uid,
											role: obj[key].role,
											name: obj[key].name,
											email: obj[key].email,
											gender: obj[key].gender,
											profesi: obj[key].profesi,
											bornDate: obj[key].bornDate,
											description: obj[key].description,
											province: obj[key].province,
											city: obj[key].city,
											address: obj[key].address,
											phones: obj[key].phones,
											interests: obj[key].interests,
											profilePicture: obj[key].profilePicture,
											appreciation: obj[key].appreciation,
											activities: obj[key].activities
										}
									}
								} else if (userData.displayName === 'organization') {
									for (let key in obj) {
										newUser = {
											id: key,
											uid: obj[key].uid,
											role: obj[key].role,
											name: obj[key].name,
											email: obj[key].email,
											bornDate: obj[key].bornDate,
											adminName: obj[key].adminName,
											adminEmail: obj[key].adminEmail,
											description: obj[key].description,
											province: obj[key].province,
											city: obj[key].city,
											address: obj[key].address,
											phones: obj[key].phones,
											website: obj[key].website,
											interests: obj[key].interests,
											profilePicture: obj[key].profilePicture,
											appreciation: obj[key].appreciation,
											activities: obj[key].activities
										}
									}
								}

								dispatch('GetAllNotifications');

								commit('setLoading', false);
								commit('setUser', newUser);
							}
						)
						.catch(
							error => {
								commit('setLoading', false);
								commit('setAuthError', error);
							}
						)
					}
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setAuthError', error);
				}
			)
		},
		SignOutUser ({ commit }) {
			commit('clearAuthError');
			firebase.auth()
			.signOut()
			.then(
				() => {
					router.push('/');
					commit('resetAll');
				}
			)
			.catch(
				error => {
					commit('setAuthError', error);
				}
			)
		},
		AutoSignIn({ commit, dispatch }, payload) {
			switch(payload.displayName) {
				case 'admin':
				{
					commit('setUser', { 
						uid: payload.uid,
						name: payload.displayName,
						role: 'admin',
						photoURL: payload.photoURL
					});

					router.push('/admin/dashboard');
				}
				break;
				case 'volunteer':
				case 'organization':
				{
					const userDB = firebase.database().ref('users_data');
					userDB.orderByChild('uid').equalTo(payload.uid).once('value')
					.then(
						data => {
							let newUser = {};
							const obj = data.val();
							
							if (payload.displayName === 'volunteer') {
								for (let key in obj) {
									newUser = {
										id: key,
										uid: obj[key].uid,
										role: obj[key].role,
										name: obj[key].name,
										email: obj[key].email,
										gender: obj[key].gender,
										profesi: obj[key].profesi,
										bornDate: obj[key].bornDate,
										description: obj[key].description,
										province: obj[key].province,
										city: obj[key].city,
										address: obj[key].address,
										phones: obj[key].phones,
										interests: obj[key].interests,
										profilePicture: obj[key].profilePicture,
										appreciation: obj[key].appreciation,
										activities: obj[key].activities
									}
								}
							} else if (payload.displayName === 'organization') {
								for (let key in obj) {
									newUser = {
										id: key,
										uid: obj[key].uid,
										role: obj[key].role,
										name: obj[key].name,
										email: obj[key].email,
										bornDate: obj[key].bornDate,
										adminName: obj[key].adminName,
										adminEmail: obj[key].adminEmail,
										description: obj[key].description,
										province: obj[key].province,
										city: obj[key].city,
										address: obj[key].address,
										phones: obj[key].phones,
										website: obj[key].website,
										interests: obj[key].interests,
										profilePicture: obj[key].profilePicture,
										appreciation: obj[key].appreciation,
										activities: obj[key].activities
									}
								}
							}

							commit('setUser', newUser);
							dispatch('GetAllNotifications');
							router.push('/dashboard');
						}
					)
					.catch(
						error => {
							commit('setAuthError', error);
						}
					)
				}
				break;
			}
		},
		ClearAuthError ({ commit }) {
			commit('clearAuthError');
		},
		UpdateProfile ({ commit }, payload) {
			commit('setLoading', true);
			const userDB = firebase.database().ref('users_data/' + payload.data.id);

			if (payload.image) {
				const filename = payload.image.name;
				const ext = filename.slice(filename.lastIndexOf('.'));
				firebase.storage().ref('users/' + payload.data.id + '.' + ext).put(payload.image)
				.then(
					fileData => {
						return fileData.ref.getDownloadURL()
					}
				)
				.then(
					downloadURL => {
						userDB.update({ 
							...payload.data,
							profilePicture: downloadURL
						})
						.then(
							() => {
								commit('updateUser', { 
									...payload.data,
									profilePicture: downloadURL
								});

								commit('setSnackbars', {
									active: true,
									color: "success",
									message: 'Pembaruan profil berhasil.'
								});

								commit('setLoading', false);
							}
						)
						.catch (
							error => {
								commit('setSnackbars', {
									active: true,
									color: "error",
									message: 'Terjadi kesalahan. Silakan coba lagi nanti.'
								});

								commit('setLoading', false);
							}
						)
					}
				)
				.catch (
					error => {
						commit('setSnackbars', {
							active: true,
							color: "error",
							message: 'Terjadi kesalahan. Silakan coba lagi nanti.'
						});

						commit('setLoading', false);
					}
				)
			} else {
				userDB.update({ ...payload.data })
				.then(
					() => {
						commit('updateUser', { ...payload.data });
						commit('setSnackbars', {
							active: true,
							color: "success",
							message: 'Pembaruan profil berhasil.'
						});
						commit('setLoading', false);
					}
				)
				.catch (
					error => {
						commit('setSnackbars', {
							active: true,
							color: "error",
							message: 'Terjadi kesalahan. Silakan coba lagi nanti.'
						});
						commit('setLoading', false);
					}
				)
			}
		},
		VerifyOrganization({ commit }, payload) {
			commit('setLoading', true);

			const orgVerifyDB = firebase.database().ref('organization_request/' + payload.id);
			orgVerifyDB.update({ status: payload.status })
			.then(
				() => {
					if (payload.status !== 'accept') {
						commit('setLoading', false);
						//TODO: reload request list for oragnization
						commit('setSnackbars', {
							active: true,
							color: "success",
							message: 'Anda telah menolak permohonan bergabung menjadi organisasi.'
						});
						return;
					}

					let data = {
						uid: payload.uid,
						role: payload.role,
						name: payload.name,
						email: payload.email,
						bornDate: 'empty',
						adminName: 'empty',
						adminEmail: 'empty',
						description: payload.description,
						province: payload.province,
						city: payload.city,
						address: payload.address,
						phones: payload.phones,
						website: 'empty',
						interests: 'empty',
						profilePicture: 'https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fdefault_profile.jpg?alt=media&token=1f0f6637-74fd-4a48-9fa9-41e644685338',
						appreciation: 0,
						activities: [],
						created_at: new Date().toISOString().substr(0, 10)
					}
					firebase.database().ref('users_data').push(data)
					.then(
						data => {
							commit('setLoading', false);

							const key = data.key;

							dispatch('SetUserNotification', {
								id: key,
								notif: []
							});

							commit('setSnackbars', {
								active: true,
								color: "success",
								message: 'Permohonan pendaftaran organisasi berhasil diterima.'
							});
						}
					)
					.catch(
						error => {
							commit('setSnackbars', {
								active: true,
								color: "error",
								message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
							});
							commit('setLoading', false);
						}
					)
				}
			)
			.catch(
				error => {
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
					commit('setLoading', false);
				}
			)
		},
		GetVolunteersList ({ commit, getters }) {
			if (getters.fetchVolunteers) return;
			commit('setLoading', true);
			commit('clearVolunteers');
			commit('setFetchVolunteers');
			const userDB = firebase.database().ref('users_data');
			userDB.orderByChild('role').equalTo('volunteer').once('value')
			.then(
				data => {
					let volunteer = {};
					let collection = [];
					const obj = data.val();
					for (let key in obj) {
						volunteer = {
							id: key,
							uid: obj[key].uid,
							role: obj[key].role,
							name: obj[key].name,
							email: obj[key].email,
							gender: obj[key].gender,
							profesi: obj[key].profesi,
							bornDate: obj[key].bornDate,
							description: obj[key].description,
							province: obj[key].province,
							city: obj[key].city,
							address: obj[key].address,
							phones: obj[key].phones,
							interests: obj[key].interests,
							profilePicture: obj[key].profilePicture,
							appreciation: obj[key].appreciation,
							activities: obj[key].activities,
							created_at: obj[key].created_at
						}
						collection.push(volunteer);
					}
					commit('setVolunteers', collection);
					commit('setLoading', false);
					commit('clearFetchVolunteers');
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
					commit('clearFetchVolunteers');
				}
			)
		},
		GetOrganizationsList ({ commit, getters }) {
			if (getters.fetchOrganizations) return;
			commit('setLoading', true);
			commit('clearOrganizations');
			commit('setFetchOrganizations');
			const userDB = firebase.database().ref('users_data');
			userDB.orderByChild('role').equalTo('organization').once('value')
			.then(
				data => {
					let organization = {};
					let collection = [];
					const obj = data.val();
					for (let key in obj) {
						organization = {
							id: key,
							uid: obj[key].uid,
							role: obj[key].role,
							name: obj[key].name,
							email: obj[key].email,
							bornDate: obj[key].bornDate,
							adminName: obj[key].adminName,
							adminEmail: obj[key].adminEmail,
							description: obj[key].description,
							province: obj[key].province,
							city: obj[key].city,
							address: obj[key].address,
							phones: obj[key].phones,
							website: obj[key].website,
							interests: obj[key].interests,
							profilePicture: obj[key].profilePicture,
							appreciation: obj[key].appreciation,
							activities: obj[key].activities,
							created_at: obj[key].created_at
						}
						collection.push(organization);
					}
					commit('setOrganizations', collection);
					commit('setLoading', false);
					commit('clearFetchOrganizations');
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
					commit('clearFetchOrganizations');
				}
			)
		},
		CreateActivity ({ commit }, payload) {
			commit('setLoading', true);

			let key = '';
			let imageURL = '';
			firebase.database().ref('activities_data').push({ 
				...payload.data,
				imgSrc: 'default_image_url'
			})
			.then(
				data => {
					key = data.key;
					return key
				}
			)
			.then(
				key => {
					if (payload.image) {
						const filename = payload.image.name;
						const ext = filename.slice(filename.lastIndexOf('.'));
						firebase.storage().ref('activities/' + key + '.' + ext).put(payload.image)
						.then(
							fileData => {
								return fileData.ref.getDownloadURL()
							}
						)
						.then(
							downloadURL => {
								payload.imgSrc = downloadURL;
								firebase.database().ref('activities_data/' + key).update({ 
									...payload.data,
									registeredVolunteers: 'empty',
									created_at: new Date().toISOString().substr(0, 10)
								})
								.then(
									() => {
										commit('setLoading', false);
										commit('setSnackbars', {
											active: true,
											color: "success",
											message: 'Pembuatan Aktivitas berhasil.'
										});
										router.go(-1);
									}
								)
								.catch(
									error => {
										commit('setLoading', false);
										commit('setSnackbars', {
											active: true,
											color: "error",
											message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
										});
									}
								)
							}
						)
						.catch(
							error => {
								commit('setLoading', false);
								commit('setSnackbars', {
									active: true,
									color: "error",
									message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
								});
							}
						)
					} else {
						firebase.database().ref('activities_data/' + key).update({ 
							...payload.data,
							registeredVolunteers: 'empty',
							created_at: new Date().toISOString().substr(0, 10)
						})
						.then(
							() => {
								commit('setLoading', false);
								commit('setSnackbars', {
									active: true,
									color: "success",
									message: 'Pembuatan Aktivitas berhasil.'
								});
								router.go(-1);
							}
						)
						.catch(
							error => {
								commit('setLoading', false);
								commit('setSnackbars', {
									active: true,
									color: "error",
									message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
								});
							}
						)
					}
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
				}
			)
		},
		EditActivity ({ commit }, payload) {
			commit('setLoading', true);
			if (payload.image) {
				const filename = payload.image.name;
				const ext = filename.slice(filename.lastIndexOf('.'));
				firebase.storage().ref('activities/' + payload.data.id + '.' + ext).put(payload.image)
				.then(
					fileData => {
						return fileData.ref.getDownloadURL()
					}
				)
				.then(
					downloadURL => {
						payload.imgSrc = downloadURL;
						firebase.database().ref('activities_data/' + payload.data.id).update({ 
							...payload.data
						})
						.then(
							() => {
								commit('setLoading', false);
								commit('setSnackbars', {
									active: true,
									color: "error",
									message: 'Perubahan Aktivitas berhasil.'
								});
								commit('clearActivity');
								router.go(-1);
							}
						)
						.catch(
							error => {
								commit('setLoading', false);
								commit('setSnackbars', {
									active: true,
									color: "error",
									message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
								});
								commit('clearActivity');
								router.go(-1);
							}
						)
					}
				)
				.catch(
					error => {
						commit('setLoading', false);
						commit('setSnackbars', {
							active: true,
							color: "error",
							message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
						});
						commit('clearActivity');
						router.go(-1);
					}
				)
			} else {
				firebase.database().ref('activities_data/' + payload.data.id).update({ 
					...payload.data
				})
				.then(
					() => {
						commit('setLoading', false);
						commit('setSnackbars', {
							active: true,
							color: "error",
							message: 'Perubahan Aktivitas berhasil.'
						});
						commit('clearActivity');
						router.go(-1);
					}
				)
				.catch(
					error => {
						commit('setLoading', false);
						commit('setSnackbars', {
							active: true,
							color: "error",
							message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
						});
						commit('clearActivity');
						router.go(-1);
					}
				)
			}
		},
		ConfirmationActivity ({ commit }, payload) {
			commit('setLoading', true);
			const activityDB = firebase.database().ref('activities_data/' + payload.id);
			activityDB.update({ status: payload.status })
			.then(
				() => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "success",
						message: payload.status === 'accept' ? 'Anda telah menerima permohonan aktivitas.' : 'Anda telah menolak permohonan aktivitas.'
					});
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
				}
			)
		},
		GetActivitiesList ({ commit, getters }) {
			if (getters.fetchActivities) return;
			commit('setLoading', true);
			commit('clearActivities');
			commit('setFetchActivities');
			const activityDB = firebase.database().ref('activities_data');
			activityDB.once('value')
			.then(
				data => {
					let activity = {};
					let collection = [];
					const obj = data.val();
					for (let key in obj) {
						activity = {
							id: key,
							name: obj[key].name,
							organization: obj[key].organization,
							imgSrc: obj[key].imgSrc,
							category: obj[key].category,
							startDate: obj[key].startDate,
							endDate: obj[key].endDate,
							duration: obj[key].duration,
							province: obj[key].province,
							city: obj[key].city,
							address: obj[key].address,
							description: obj[key].description,
							finalRegistrationDate: obj[key].finalRegistrationDate,
							registeredVolunteers: obj[key].registeredVolunteers,
							status: obj[key].status,
							created_at: obj[key].created_at
						}
						collection.push(activity);
					}
					commit('setActivities', collection);
					commit('setLoading', false);
					commit('clearFetchActivities');
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
					commit('clearFetchActivities');
				}
			)
		},
		GetActivity ({ commit }, payload) {
			commit('setLoading', true);
			commit('clearActivity');
			const activityDB = firebase.database().ref('activities_data/' + payload.id);
			activityDB.once('value')
			.then(
				data => {
					let activity = {};
					const obj = data.val();
					
					activity = {
						id: payload.id,
						name: obj.name,
						organization: obj.organization,
						imgSrc: obj.imgSrc,
						category: obj.category,
						startDate: obj.startDate,
						endDate: obj.endDate,
						duration: obj.duration,
						province: obj.province,
						city: obj.city,
						address: obj.address,
						description: obj.description,
						finalRegistrationDate: obj.finalRegistrationDate,
						registeredVolunteers: obj.registeredVolunteers,
						status: obj.status,
						created_at: obj.created_at
					}

					commit('setActivity', activity);
					commit('setLoading', false);
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
				}
			)
		},
		SignInAdmin ({ commit }, payload) {
			commit('setLoading', true);
			commit('clearAuthError');
			firebase.auth()
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then(
				data => {
					let userData = data.user;
					
					if (userData.displayName != 'admin') {
						commit('setAuthError', { message: 'You account is not admin.' });
						return;
					}

					if (!userData.emailVerified) {
						userData.updateProfile({
							emailVerified: true
						})
						.then(
							() => {
								commit('setUser', { 
									uid: userData.uid,
									name: userData.displayName,
									role: 'admin',
									photoURL: userData.photoURL
								});
								commit('setLoading', false);
							}
						)
						.catch(
							error => {
								commit('setAuthError', error);
								commit('setLoading', false);
							}
						)
					} else {
						commit('setUser', { 
							uid: userData.uid,
							name: userData.displayName,
							role: 'admin',
							photoURL: userData.photoURL
						});
						commit('setLoading', false);
					}
				}
			)
			.catch(
				error => {
					commit('setAuthError', error);
					commit('setLoading', false);
				}
			)
		},
		SignOutAdmin ({ commit }) {
			commit('clearAuthError');
			firebase.auth()
			.signOut()
			.then(
				() => {
					router.push('/admin/login');
					commit('resetAll');
				}
			)
			.catch(
				error => {
					commit('setAuthError', error);
					commit('setLoading', false);
				}
			)
		},
		GetOrganizationsReqList ({ commit, getters }) {
			if (getters.fetchOrganizationsReq) return;
			commit('setLoading', true);
			commit('clearOrganizationsReq');
			commit('setFetchOrganizationsReq');
			const orgReqDB = firebase.database().ref('organization_request');
			orgReqDB.once('value')
			.then(
				data => {
					let organizationReq = {};
					let collection = [];
					const obj = data.val();
					for (let key in obj) {
						organizationReq = {
							id: key,
							uid: obj[key].uid,
							role: obj[key].role,
							name: obj[key].name,
							email: obj[key].email,
							description: obj[key].description,
							province: obj[key].province,
							city: obj[key].city,
							address: obj[key].address,
							phones: obj[key].phones,
							status: obj[key].status,
							created_at: obj[key].created_at
						}
						collection.push(organizationReq);
					}
					commit('setOrganizationsReq', collection);
					commit('setLoading', false);
					commit('clearFetchOrganizationsReq');
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
					commit('clearFetchOrganizationsReq');
				}
			)
		},
		SendJoinRequest({ commit }, payload) {
			commit('setLoading', true);
			let data = {
				uid: payload.uid,
				aid: payload.aid,
				username: payload.username,
				activityname: payload.activityname,
				organization: payload.organization,
				useremail: payload.useremail,
				question_1: payload.question_1,
				question_2: payload.question_2,
				question_3: payload.question_3,
				userprovince: payload.userprovince,
				usercity: payload.usercity,
				useraddress: payload.useraddress,
				userphones: payload.userphones,
				userProfilePicture: payload.userProfilePicture,
				status: 'pending',
				created_at: new Date().toISOString().substr(0, 10)
			}
			firebase.database().ref('volunteer_request').push(data)
			.then(
				() => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "success",
						message: 'Permohonan bergabung dengan aktivitas ini telah berhasil dikirim.'
					});
					router.go(-1);
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
				}
			)
		},
		GetVolunteerRequest({ commit, getters }) {
			if (getters.fetchVolunteerReq) return;
			commit('setLoading', true);
			commit('clearVolunteerReq');
			commit('setFetchVolunteerReq');
			const volReqDB = firebase.database().ref('volunteer_request');
			volReqDB.once('value')
			.then(
				data => {
					let volunteerReq = {};
					let collection = [];
					const obj = data.val();
					for (let key in obj) {
						volunteerReq = {
							id: key,
							uid: obj[key].uid,
							aid: obj[key].aid,
							username: obj[key].username,
							activityname: obj[key].activityname,
							organization: obj[key].organization,
							useremail: obj[key].useremail,
							question_1: obj[key].question_1,
							question_2: obj[key].question_2,
							question_3: obj[key].question_3,
							userprovince: obj[key].userprovince,
							usercity: obj[key].usercity,
							useraddress: obj[key].useraddress,
							userphones: obj[key].userphones,
							userProfilePicture: obj[key].userProfilePicture,
							status: obj[key].status,
							created_at: obj[key].created_at
						}
						collection.push(volunteerReq);
					}
					commit('setVolunteerReq', collection);
					commit('setLoading', false);
					commit('clearFetchVolunteerReq');
				}
			)
			.catch(
				error => {
					commit('setLoading', false);
					commit('setSnackbars', {
						active: true,
						color: "error",
						message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
					});
					commit('clearFetchVolunteerReq');
				}
			)
		},
		VerifyVolunteer({ commit }, payload) {
			commit('setLoading', true);
			const volReqDB = firebase.database().ref('volunteer_request/' + payload.id);
			volReqDB.update({ status: payload.status })
			.then(
				() => {
					if (payload.status !== 'accept') {
						commit('setLoading', false);
						commit('setSnackbars', {
							active: true,
							color: "info",
							message: 'Anda telah menolak permohonan bergabung menjadi relawan.'
						});
						return;
					}

					const userDB = firebase.database().ref('users_data'/ + payload.uid);
					userDB.once('value')
					.then(
						data => {
							const obj = data.val();
							let currentActivities = [];

							if (obj.activities !== 'empty') {
								currentActivities = [ ...obj.activities ];
							}

							currentActivities.push(payload.aid);

							const saveUserDB = firebase.database().ref('users_data/' + payload.uid);
							saveUserDB.update({
								activities: currentActivities
							})
							.then(
								() => {
									const activityDB = firebase.database().ref('activities_data/' + payload.aid);
									activityDB.once('value')
									.then(
										data => {
											let currentRegisteredVolunteers = [];
											const retobj = data.val();

											if (retobj.registeredVolunteers !== 'empty') {
												currentRegisteredVolunteers = [ ...retobj.registeredVolunteers ];
											}

											currentRegisteredVolunteers.push(payload.uid);

											const saveActivityDB = firebase.database().ref('activities_data/' + payload.aid);
											saveActivityDB.update({
												registeredVolunteers: currentRegisteredVolunteers
											})
											.then(
												() => {
													commit('setLoading', false);
													commit('setSnackbars', {
														active: true,
														color: "success",
														message: 'Anda telah menerima permohonan bergabung menjadi relawan.'
													});
												}
											)
										}
									)
									.catch(
										error => {
											commit('setLoading', false);
											commit('setSnackbars', {
												active: true,
												color: "error",
												message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
											});
										}
									)
								}
							)
						}
					)
					.catch(
						error => {
							commit('setLoading', false);
							commit('setSnackbars', {
								active: true,
								color: "error",
								message: 'Terjadi kesalahan. Silakan coba kembali nanti.'
							});
						}
					)
				}
			)
		},
		SendNotification ({ getters, dispatch }, payload) {
			const notifDB = firebase.database().ref('notifications/' + payload.toID);
			notifDB.update({ notif: notifications })
			.then(
				data => {
					if (payload.toID === getters.user.id) {
						dispatch('GetAllNotifications');
					}
				}
			)
			.catch(
				error => {
					return;
				}
			)
		},
		GetAllNotifications ({ commit, getters }) {
			commit('clearNotifications');
			const notifDB = firebase.database().ref('notifications/' + getters.user.id);
			notifDB.once('value')
			.then(
				data => {
					const obj = data.val();
					commit('setNotifications', [ ...obj.notif ]);
				}
			)
			.catch(
				error => {
					return;
				}
			)
		}
	},
	getters: {
		isNavOpen (state) {
			return state.navState;
		},
		isOnTop (state) {
			return state.onTop;
		},
		isLogin (state) {
			return state.user !== null;
		},
		user (state) {
			return state.user;
		},
		userID (state) {
			return state.user.id;
		},
		userRole (state) {
			return state.user !== null ? state.user.role : '';
		},
		userTmpRole (state) {
			return state.userTmpRole;
		},
		userName (state) {
			return state.user !== null ? state.user.name : '';
		},
		userEmail (state) {
			return state.userEmail;
		},
		profilePicture (state) {
			return state.user.role !== 'admin' ? state.user.profilePicture : state.user.photoURL;
		},
		isLoading (state) {
			return state.loading;
		},
		authError (state) {
			return state.authError;
		},
		fetchVolunteers (state) {
			return state.fetchVolunteers;
		},
		volunteers (state) {
			return state.volunteers;
		},
		fetchOrganizations (state) {
			return state.fetchOrganizations;
		},
		organizations (state) {
			return state.organizations;
		},
		fetchVolunteerReq (state) {
			return state.fetchVolunteerReq
		},
		volunteerReq (state) {
			return state.volunteerReq;
		},
		fetchOrganizationsReq (state) {
			return state.fetchOrganizationsReq;
		},
		organizationsReq (state) {
			return state.organizationsReq;
		},
		fetchActivities (state) {
			return state.fetchActivities;
		},
		activities (state) {
			return state.activities;
		},
		activity (state) {
			return state.activity;
		},
		notifications (state) {
			return state.notifications;
		},
		snackbars (state) {
			return state.snackbars;
		}
	}
});
