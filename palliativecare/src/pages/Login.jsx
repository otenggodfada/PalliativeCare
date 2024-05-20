const Login = () => {
    return (  <div className="bg-primaryBackground text-primaryText flex items-center flex-col justify-start min-h-screen p-4">
    <div
      className="pb-5 flex flex-row  justify-between w-full text-accent hover:text-primaryText cursor-pointer"
    
    >
    <a href="home">Home</a>
    </div>
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-mypink">
        Sign In
      </h2>
      <form className="space-y-4">
     
        <div>
          <label htmlFor="email" className="block text-secondaryText">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
            placeholder="Your email"
            required
          ></input>
        </div>
   
        <div>
          <label htmlFor="password" className="block text-secondaryText">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
            placeholder="Password"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-mypink text-white font-semibold rounded-lg shadow-md hover:bg-primaryButton/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryButton"
        >
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-secondaryText">
        Don't have account?{" "}
        <a href="/register" className="text-mypink hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </div>);
}
 
export default Login;