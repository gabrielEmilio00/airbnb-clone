'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegisterModal } from "@/app/hooks/UserRegisterModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm,  } from "react-hook-form";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";

export const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { 
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '', 
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((err) => { 
        toast.error('Something went wrong. Please try again')
      })
      .finally(() => {
        setIsLoading(false);
      });
  } 

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome to Airbnb"
        subtitle="Create an Account"
      />
      <Input 
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="pswd"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
      outline
      label="Continue with Google"
      icon={FcGoogle}
      onClick={() => {}}
      />
      <Button
      outline
      label="Continue with Github"
      icon={AiFillGithub}
      onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">          
          <div>Already have an account ?</div>

          <div
          onClick={registerModal.onClose}
          className="text-rose-500 cursor-pointer hover:underline">Log in</div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal 
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Register"
    actionLabel="Continue"
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}