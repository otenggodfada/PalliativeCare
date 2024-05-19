const SplashScreen = () => {
    return ( <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-softBlue to-mintGreen">
    <div className="text-center">
      {/* <img src="path/to/your-logo.png" alt="App Logo" className="mx-auto mb-4 w-24 h-24"> */}
      <h1 className="text-4xl font-bold text-primaryText">Palliative Care App</h1>
      <p className="mt-2 text-lg text-secondaryText">Caring Together</p>
      <div className="mt-8">
        <svg className="animate-spin h-8 w-8 text-accent mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>
      <p className="mt-4 text-xs text-secondaryText">Powered by [Your Company Name]</p>
    </div>
  </div> );
}
 
export default SplashScreen;