/** @format */
import logo from "../assets/images/logo.png"
import im2 from "../assets/images/im2.png";
const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-end min-h-screen ">
      <div className="p-2 flex flex-col   items-center"><svg xmlns="http://www.w3.org/2000/svg" height="27px" viewBox="0 -960 960 960" width="27px" fill="#ff145b"><path d="M360-160q-19 0-34-11t-22-28l-92-241H40v-80h228l92 244 184-485q7-17 22-28t34-11q19 0 34 11t22 28l92 241h172v80H692l-92-244-184 485q-7 17-22 28t-34 11Z"/></svg>
  <div className=" text-center text-fuchsia-950  text-3xl font-bold  font-['Inter']">We are always ready for <br/>your health care</div>
  <div className=" text-center"><span className="text-fuchsia-950 text-2x1 font-semibold font-['Inter']">Contacting a palliative care now is<br/></span><span className="text-mypink  font-semibold font-['Inter']"> easy and quick!</span></div>
  {/* <img className="w-8 h-9 " src={logo} /> */}
</div>
      <div className="w-full h-full pt-20 bg-white rounded-tl-full rounded-tr-full  shadow-blue-400 shadow-2xl flex-col justify-end items-center inline-flex">
      <img className="w-14 h-16" src={logo} />
        <img className="w-full h-full" src={im2} />
        <div className="w-12 h-12 px-2 py-2  animate-pulse  origin-center absolute  bottom-16  rotate-[38.01deg] bg-mypink rounded justify-center items-center inline-flex">
          <svg
            className="  rotate-[-50.01deg]"
            width="24"
            height="23"
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3604 12.9239C24.0865 12.2256 24.1093 11.0689 23.4111 10.3426L14.4744 1.04623C13.7762 0.319952 12.6196 0.297208 11.8934 0.995478C11.1672 1.69375 11.1445 2.85048 11.8426 3.57676L19.5171 11.56L11.5404 19.2355C10.8142 19.9338 10.7915 21.0905 11.4897 21.8168C12.1878 22.5431 13.3444 22.5658 14.0706 21.8676L23.3659 12.9297L23.3604 12.9239ZM3.12583 21.6466L12.4211 12.7088C13.1473 12.0105 13.1701 10.8538 12.4719 10.1275L3.53516 0.831115C2.83698 0.104835 1.68038 0.0820911 0.954185 0.780361C0.22799 1.47863 0.205243 2.63537 0.903425 3.36165L8.57784 11.3449L0.6012 19.0204C-0.124996 19.7187 -0.147743 20.8754 0.55044 21.6017C1.24862 22.328 2.40522 22.3507 3.13141 21.6524L3.12583 21.6466Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
