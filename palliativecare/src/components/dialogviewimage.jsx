import React from "react";
import img1 from "../assets/images/im1.png"
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
 
const ImageDialogo = () => {
    const [open, setOpen] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);
   
    const handleOpen = () => setOpen((cur) => !cur);
    const handleIsFavorite = () => setIsFavorite((cur) => !cur);
   
    return (
      <>
        <Card
          className="w-28 h-24 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
          onClick={handleOpen}
        >
          <img
            alt="nature"
            className="h-full w-full object-cover object-center"
            src={img1}
          />
        </Card>
         <Dialog size="xl" open={open} handler={handleOpen}>
          <DialogHeader className="justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                size="sm"
                variant="circular"
                alt="tania andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <div className="-mt-px flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                   Dr. Wilson
                </Typography>
                
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconButton
                variant="text"
                size="sm"
                color={isFavorite ? "red" : "blue-gray"}
                onClick={handleIsFavorite}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </IconButton>
        
            </div>
          </DialogHeader>
          <DialogBody>
            <img
              alt="nature"
              className="h-50 w-full  rounded-lg object-cover object-center"
              src={img1}
            />
          </DialogBody>
       
        </Dialog>
      </>
    );
}
 
export default ImageDialogo;