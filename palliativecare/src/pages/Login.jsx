const Login = () => {
    return (  <body class="bg-primaryBackground text-primaryText flex items-center flex-col justify-start min-h-screen p-4">
    <div
      className="pb-5 flex flex-row  justify-between w-full text-accent hover:text-primaryText cursor-pointer"
    
    >
    <a href="/">Home</a>
    </div>
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-semibold text-center mb-6 text-accent">
        Sign In
      </h2>
      <form class="space-y-4">
     
        <div>
          <label for="email" class="block text-secondaryText">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
            placeholder="Your email"
            required
          ></input>
        </div>
   
        <div>
          <label for="password" class="block text-secondaryText">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
            placeholder="Password"
            required
          ></input>
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-primaryButton text-primaryText font-semibold rounded-lg shadow-md hover:bg-primaryButton/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryButton"
        >
          Sign In
        </button>
      </form>
      <p class="mt-6 text-center text-secondaryText">
        Don't have account?{" "}
        <a href="/register" class="text-accent hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </body>);
}
 
export default Login;