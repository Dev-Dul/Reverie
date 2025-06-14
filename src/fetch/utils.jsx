import { useEffect, useState } from "react";


// Sign Up, Login and Refresh Handlers
export function useSignUp(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    async function SignUp(username, password) {
      try {
        const res = await fetch("http://localhost:3000/api/v1/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        console.log(res.status);
        if(!res.ok){
          const errData = await res.json();
          throw new Error(errData.message);
        } 
        const json = await res.json();
        setData(json);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    return { data, loading, error, SignUp };
}

export function useLogIn(){
    async function logIn(username, password){
      try {
        const res = await fetch("http://localhost:3000/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (!res.ok) throw new Error("Log In Failed!");
        const json = await res.json();
        localStorage.setItem("jwt", json.token);
        localStorage.setItem("refresh", json.refreshToken);
        console.log("response received");
        console.log(json);
        return json;

      }catch(err){
        throw err;
      }
    }
    
    return { logIn };
}


async function Refresh(){
    const token = localStorage.getItem("refresh");
    
    try {
        const res = await fetch("http://localhost:3000/api/v1/refresh", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token,
        }),
      });


      if(!res.ok) throw new Error("Refresh Failed!");
      const json = await res.json();
      localStorage.setItem("jwt", json.newAccessToken);
      
    }catch(err){
      console.log(err.message);
    }
    
}

async function rerun(id, flag, commentId = null, commentBody = null, body = null){
  let res;
  switch(flag){
    case "delPost": 
      res = await fetch(`http://localhost:3000/api/v1/blog/${id}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
    break;

    case "editPost": 
      res = await fetch(`http://localhost:3000/api/v1/blog/${id}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          postBody: body,
        }),
      });

    break;

    case "delComment":
        res = await fetch(
          `http://localhost:3000/api/v1/blog/${id}/comments/${commentId}/delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }
        );

    break;

    case "editComment":
        res = await fetch(
          `http://localhost:3000/api/v1/blog/${id}/comments/${commentId}/edit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
              commentBody: commentBody,
            }),
          }
        );

    break;
  }

  return res;
}


// Functions and Logic For Handling Post Events
export function useFetchPosts(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try{
                const res = await fetch("http://localhost:3000/api/v1/blog/");
                if(!res.ok) throw new Error('Failed to fetch');
                const json = await res.json();
                setData(json.posts);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }
    fetchData();

    }, [])

  return { data, loading, error };
}

export function useFetchPost(id){
    const [info, setData] = useState(null);
    const [load, setLoading] = useState(true);
    const [err, setError] = useState(null);

    async function fetchData(id){
      try{
        const res = await fetch(`http://localhost:3000/api/v1/blog/${id}`);
        if(!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json.post);

      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    useEffect(() => {    
      fetchData(id);
    }, [])

  return { info, load, err, fetchData };
}


export function useCreatePost(){
    async function createPost(title, text, id) {
      try {
        let res = await fetch("http://localhost:3000/api/v1/blog/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            text: text,
            authorId: id,
          }),
        });

        if(!res.ok) throw new Error("Create Post Failed!");
        const json = await res.json();
        return json;

      }catch(err){
        throw err;
      }
    }

    return { createPost };
}

export function useDeletePost(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [delError, setError] = useState(null);


    async function deletePost(id) {
      try {
        let res = await fetch(
          `http://localhost:3000/api/v1/blog/${id}/delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }
        );

        if(res.status === 401){
          Refresh();
          res = await rerun(id, "delPost");
        }

        if(!res.ok) throw new Error("Delete Post Failed!");
        const json = await res.json();
        setData(json);

      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    return { data, loading, delError, deletePost };
}

export function useEditPost(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function editPost(id, body){
        try {
          let res = await fetch(`http://localhost:3000/api/v1/blog/${id}/edit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                postBody: body,
            })
          });

          if(res.status === 401){
             Refresh();
             res = await rerun(id, "editPost", null, null, body);
          }

          if (!res.ok) throw new Error("Edit Post Failed!");
          const json = await res.json();
          setData(json);

        }catch(err){
          setError(err.message);
        }finally{
          setLoading(false);
        }
      }

    return { data, loading, error, editPost };
}


export function UsePublishPost(){
    async function publishPost(id){
      try{
        const res = await fetch(
          `http://localhost:3000/api/v1/blog/${id}/publish`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if(!res.ok) throw new Error("Publish Post Failed!");
        const json = await res.json();
        return json;
      }catch(err){
        throw err;
      }
    }

    return { publishPost };
}


// Functions and Logic For Handling Comment Events
export function useCreateComment(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function createComment(id, body, author) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/blog/${id}/comments/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              body: body,
              author: author,
            }),
          }
        );

        if(!res.ok) throw new Error("Create Comment Failed!");
        const json = await res.json();
        setData(json);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    return { data, loading, error, createComment };
}


export function useEditComment(){
    const [isEdit, setData] = useState(null);
    const [editLoad, setLoading] = useState(true);
    const [editErr, setError] = useState(null);


    async function editComment(id, commentId, commentBody) {
      try {
        let res = await fetch(
          `http://localhost:3000/api/v1/blog/${id}/comments/${commentId}/edit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
              commentBody: commentBody,
            }),
          }
        );

        if(res.status === 401) {
          Refresh();
          res = await rerun(id, "editComment", commentId, commentBody);
        }

        if(!res.ok){
          const errData = await res.json();
          throw new Error(errData);
        } 
        const json = await res.json();
        setData(json);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    return { isEdit, editLoad, editErr, editComment };
}


export function useDeleteComment(){
    const [msg, setData] = useState(null);
    const [ldg, setLoading] = useState(true);
    const [errMsg, setError] = useState(null);

    async function delComment(id, commentId){
      try{
        let res = await fetch(
          `http://localhost:3000/api/v1/blog/${id}/comments/${commentId}/delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }
        );

        if(res.status === 401){
          Refresh();
          res = await rerun(id, "delComment", commentId);
        }

        if(!res.ok) throw new Error("Delete Comment Failed!");
        const json = await res.json();
        setData(json);

      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }


    return { msg, ldg, errMsg, delComment };
}

