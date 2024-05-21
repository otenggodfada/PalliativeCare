const AlertBox = (message) => {
    return ( 
        <Alert
        icon={<Icon />}
        className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
      >
    {message}
      </Alert>
    );

     
}
 
export default AlertBox;