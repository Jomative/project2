import { useUserStore } from "./stores/user";

export const server_url = "https://excursions-api-server.azurewebsites.net";

export async function getFriends(){
    let token = useUserStore().token;
    if(!token) return;
    
    let url = `${server_url}/friends`;
    let res = await fetch(url,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        let data = await res.json();
        return data.friends;
    }
    else{
        alert("Failed to get friends");
    }
}

export async function deleteFriend(friendId){
    let token = useUserStore().token;
    if(!token) return;
    
    let url = `${server_url}/friends/${friendId}`;
    let res = await fetch(url,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        console.log("deleted friend successfully");
    }
    else{
        alert("Failed to delete friend");
        console.error("FAILED",await res.text());
    }
}

export async function createFriendRequest(friendId){
    let token = useUserStore().token;
    if(!token) return;
    
    let url = `${server_url}/friends/requests`;
    let res = await fetch(url,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            friendId
        })
    });

    if(res.ok){
        let data = (await res.json()).friendRequest;
        console.log(data);
        return data;
    }
    else{
        alert("Failed to create friend request");
    }
}

export async function getFriendRequests(){
    let token = useUserStore().token;
    if(!token) return;
    
    let url = `${server_url}/friends/requests`;
    let res = await fetch(url,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        let data = (await res.json()).friendRequests;
        console.log(data);
        return data;
    }
    else{
        alert("Failed to get friend requests");
    }
}

export async function handleFriendRequest(requestId,isAccepted){
    let token = useUserStore().token;
    if(!token) return;
    
    let url = `${server_url}/friends/requests/${requestId}`;
    let res = await fetch(url,{
        method:"PATCH",
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            isAccepted
        })
    });

    if(res.ok){
        let data = (await res.json()).friendRequest;
        console.log(data);
        return data;
    }
    else{
        alert("Failed to handle friend request");
    }
}

export async function deleteFriendRequest(requestId){
    let token = useUserStore().token;
    if(!token) return;
    
    let url = `${server_url}/friends/requests/${requestId}`;
    let res = await fetch(url,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        console.log("successfully deleted friend request");
    }
    else{
        alert("Failed to handle friend request");
    }
}

export async function getAllUsers(){
    let token = useUserStore().token;
    if(!token) return;
    
    let url = `${server_url}/users?limit=300`;
    let res = await fetch(url,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(res.ok){
        let data = await res.json();
        console.log("get users",data);
        return data;
    }
    else{
        alert("Failed to get users");
    }
}

