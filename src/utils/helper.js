import store from '../store';
import axios from 'axios';

export default {
    isUser: (to, from, next) => {
        if (store.getters.user) {
            if (store.getters.userRole !== 'admin') {
                next();
            } else {
                next('/admin/dashboard');
            }
        } else {
            next('/login');
        }
    },
    isOrganization: (to, from, next) => {
        if (store.getters.user) {
            if (store.getters.userRole === 'organization') {
                next();
            } else if (store.getters.userRole === 'admin') {
                next('/admin/dashboard');
            } else {
                next('/dashboard');
            }
        } else {
            next('/login');
        }
    },
    isAdmin: (to, from, next) => {
        if (store.getters.user) {
            if (store.getters.userRole === 'admin') {
                next();
            } else {
                next('/dashboard');
            }
        } else {
            next('/admin/login');
        }
    },
    generatePassword: () => {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let pass = "";

        for (let i = 0; i < 32; i++) {
            pass += chars[Math.floor(Math.random() * chars.length)];
        }

        return pass;
    },
    compareValues: (key, order='asc') => {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }
        
            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];
        
            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        }
    },
    addDays: (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },
    sendEmail: (data) => {
        const payload = {
            subject: '',
            email: 'ikhsan.nurrahim@gmail.com',
            content: ''
        }

        switch (data.type) {
            case 0:
            {
                // Organization account request accepted
                payload.subject = 'Permohonan mendaftar sebagai Organisasi untuk HereForYou';
                payload.content = `
                    <p>Halo ${ data.name },</p>
                    <br>
                    <p>Permohonan pendaftaran akun Organisasi yang kamu ajukan diterima. Silakan <a href="">login</a> dengan akun organisasi Anda.</p>
                    <br>
                    <p>Terima Kasih,</p>
                    <br>
                    <p>Tim HereForYou Anda</p>
                `;

                axios.post('http://hereforyou.rf.gd/support/email', {
                    ...payload
                })
                .then(
                    response => {
                        console.log('email sent');
                    }
                )
                .catch(
                    response => {
                        console.log(response);
                    }
                )
            }
            break;
            case 1:
            {
                payload.subject = 'Permohonan mendaftar sebagai Organisasi untuk HereForYou';
                payload.content = `
                    <p>Halo ${ data.name },</p>
                    <br>
                    <p>Mohon maaf, permohonan pendaftaran akun Organisasi yang kamu ajukan ditolak. Silakan lakukan <a href="">pendaftaran</a> kembali akun organisasi Anda.</p>
                    <br>
                    <p>Terima Kasih,</p>
                    <br>
                    <p>Tim HereForYou Anda</p>
                `;
            }
            break;
        }
    }
}