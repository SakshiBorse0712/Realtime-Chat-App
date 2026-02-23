import {create} from 'zustand';

export const useAuthStore = create((set) => ({   //(set,get) can be used
    // this are all states, we can use it in any pages , app.jsx
    authUser: {name:"Sakshi",_id:123,age:18},
    isLoggedIn: false,
    isLoading : false,

    login: () => {
        console.log("We just logged in");
        set({isLoggedIn: true , isLoading:true});
    }
}))