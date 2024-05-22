import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../api/config/firebaseConfig";
import { Apple, Close, Facebook, GitHub, Google, Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm= ({ openLoginForm, setOpenLoginForm, openRegisterForm, setOpenRegisterForm }:any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()

  const signInWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi đăng nhập với Google:", error);
      });
  };
  // const signInWithFacebook = () => {
  //   return signInWithPopup(auth, facebookProvider)
  //     .then((result) => {
  //       const user = result.user;
  //     })
  //     .catch((error) => {
  //       console.error("Đã xảy ra lỗi khi đăng nhập với Google:", error);
  //     });
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmail(formData.email, formData.password);
  };

  return (
          <>
            {openLoginForm && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 md:right-[25%] lg:top-32 flex lg:w-[800px] lg:h-[484px] items-center bg-white z-50 border-[1px]">
              <Close
                onClick={()=>setOpenLoginForm(!openLoginForm)}
                className="absolute right-4 top-4 text-2xl text-black cursor-pointer"
              />
              {/* <div className="flex items-center justify-center p-8 cursor-default">
              </div> */}
                <div className="flex flex-col w-full items-center justify-center py-5">
                  <h1 className="text-black text-2xl font-medium py-5">ĐĂNG NHẬP</h1>
                  <form
                    action="#"
                    method="post"
                    onSubmit={onSubmit}
                    className="flex flex-col gap-3  w-[60%]"
                  >
                    <input
                      className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                      type="text"
                      name="username"
                      id="username"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="Email or phone"
                    />
                    <div className="relative">
                      <input
                        className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        placeholder="Password"
                      />
                      {showPassword ? (
                        <Visibility
                          className="absolute right-3 top-2 text-xl cursor-pointer text-[#4F4746]"
                          onClick={() => setShowPassword((prevState) => !prevState)}
                        />
                      ) : (
                        <VisibilityOff
                          className="absolute right-3 top-2 text-xl cursor-pointer text-[#4F4746]"
                          onClick={() => setShowPassword((prevState) => !prevState)}
                        />
                      )}
                    </div>
                    <button type="submit" onClick={()=>setOpenLoginForm(auth? false :true)} className="text-black border h-9">
                      Đăng nhập
                    </button>
                  </form>
                  <div className="flex flex-col text-black items-center py-4">
                    <h1>Đăng nhập với tài khoản khác</h1>
                    <div className="flex gap-4 py-2">
                     <div onClick={signInWithGoogle} className="cursor-pointer"><Google color="action"/></div>
                     {/* <div onClick={signInWithFacebook} className="cursor-pointer"><Facebook color="primary"/></div>
                     <div><Apple color="inherit"/></div> */}
                    </div>
                  </div>
                  <div onClick={()=>{setOpenLoginForm(!openLoginForm); setOpenRegisterForm(true)}} className="text-black cursor-pointer">Đăng ký</div>
                </div>
            </div>}
          </>
  );
};

export default LoginForm;