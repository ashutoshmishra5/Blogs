//Registration function

export const registerUser = async (router,data) => {
    try{
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
    });

    const result = await response.json();

    alert(result.message);
    if(result.message === "Registered Successfully") {
        router.push("/login");
    }
}catch(err){
    alert("Registration Unsuccessful");
}
    };

//Login page

export const loginUser = async(pressed,data,setPressed,signIn) => {

if (!pressed) {
    setPressed(true);
    const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
    });
    if (response.error) {
        setPressed(false);
        alert("Login unsuccessful");
    }
}
};