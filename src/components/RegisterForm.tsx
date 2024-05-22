import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../api/config/firebaseConfig";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterForm = ({ openLoginForm, setOpenLoginForm, setOpenRegisterForm, openRegisterForm }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePassword: '',
  });

  const register = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Đăng ký thành công");
        console.log("Đăng ký thành công", userCredential.user);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Địa chỉ email đã được sử dụng. Vui lòng sử dụng địa chỉ email khác.");
        } else {
          console.error("Đăng ký thất bại", error);
          alert("Đăng ký thất bại!");
        }
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    register(formData.email, formData.password);
  };

  return (
    <>
      {openRegisterForm && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:right-[25%] lg:top-32 flex lg:w-[800px] lg:h-[484px] items-center bg-white z-50 border-[1px]">
          <Close
            onClick={() => setOpenRegisterForm(!openRegisterForm)}
            className="absolute right-4 top-4 text-2xl text-black cursor-pointer"
          />
          <div className="flex flex-col w-full items-center justify-center py-5">
            <h1 className="text-black text-2xl font-medium py-5">ĐĂNG KÝ</h1>
            <form
              action="#"
              method="post"
              onSubmit={onSubmit}
              className="flex flex-col gap-3 w-[60%]"
            >
              <input
                className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={onChange}
                required
                placeholder="Email"
              />
              <div className="relative">
                <input
                  className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={onChange}
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
              <div className="relative">
                <input
                  className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  type={showRePassword ? 'text' : 'password'}
                  name="rePassword"
                  id="rePassword"
                  value={formData.rePassword}
                  onChange={onChange}
                  required
                  placeholder="Re Password"
                />
                {showRePassword ? (
                  <Visibility
                    className="absolute right-3 top-2 text-xl cursor-pointer text-[#4F4746]"
                    onClick={() => setShowRePassword((prevState) => !prevState)}
                  />
                ) : (
                  <VisibilityOff
                    className="absolute right-3 top-2 text-xl cursor-pointer text-[#4F4746]"
                    onClick={() => setShowRePassword((prevState) => !prevState)}
                  />
                )}
              </div>
              <button type="submit" className="text-black border h-9">
                Đăng ký
              </button>
            </form>
            <div onClick={() => { setOpenLoginForm(true); setOpenRegisterForm(false); }} className="text-black py-4 cursor-pointer">
              Đăng nhập
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
