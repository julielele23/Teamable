<template>
    <div v-show="!iseditmode" id="display-view">
            <h1>User profile</h1>
            <img :src="image">
            
            <span>Name: </span><b id="name">{{ name }}</b>
            <hr />

            <span>Email: </span><b id="email">{{ email }}</b>
            <hr />

            <span>Interests: </span><b id="interests">{{ interests }}</b>
            <hr />

            <button @click="editprofile">Edit Profile</button>
    </div>
    <div v-show="iseditmode" id="edit-view">
            <h1>User profile</h1>
            <img :src="image">
            
            <span>Name: </span>
            <input type="text" id="input-name"  v-model="name"/>
            <hr />

            <span>Email: </span>
            <input type="email" id="input-email" v-model="email"/>
            <hr />

            <span>Interests: </span>
            <input type="text" id="input-interests" v-model="interests"/>
            <hr />

            <button @click="updateprofile">Update Profile</button>
    </div>
</template>

<script> 
import  image from "./team.png"
export default {
    name: "App",
    data() {
        return {
            image: image,
            name: "",
            email: "",
            interests: "",
            iseditmode: false
            
        }
    },
    async created() {
        const userdata = await this.fetchuserprofile()
        this.name = userdata.name
        this.email = userdata.email
        this.interests = userdata.interests
    },
    methods: {
        editprofile(){
            this.iseditmode = true
        },
        async updateprofile(){
            const payload = {
                name: this.name,
                email: this.email,
                interests: this.interests
            }
            const jsonres= await this.upgradeprofile(payload)
            console.log(jsonres)
            this.iseditmode = false
        },
        async fetchuserprofile() {
            const res = await fetch("get-profile", {
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            return await res.json() // json() from json to js

        },
        async upgradeprofile(payload) {
            const res = await fetch("upgrade-profile", {
                method: "POST",
                body: JSON.stringify(payload),
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            return await res.json()
        }

    
    }
}
</script>

<style> 
img{
    width: 300px;
    display: block;
    margin-bottom: 40px;
}

hr{
    margin: 25px 0 25px 0;
    width: 550px;
}

div{
  width: 80%;
  margin: 50px auto;
}
button{
    cursor: pointer;
    font-size: 15px;
    width: 150px;
    background-color: oldlace;
    border: 1px solid brown;
    border-radius: 5px;
    height: 40px;
}
input{
    width: 200px;
    font-size: 15px;
    padding: 10px;
}


</style>