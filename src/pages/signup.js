import { React, useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RxDotFilled } from 'react-icons/rx'
import { getProviders, signIn, getSession } from 'next-auth/react'
import Link from 'next/link'
import { useFormik, FormikProvider, Form, Field, ErrorMessage } from 'formik'
import Image from 'next/image'
import Router from 'next/router'

function Signup({ providers }) {
    const [error, setError] = useState('')
    const router = Router
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: async (values) => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Please enter valid email address'
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address'
            }

            // validate confirm password
            if (!values.cpassword) {
                errors.cpassword = 'Please confirm your password'
            } else if (values.password !== values.cpassword) {
                errors.cpassword = 'Password Not Match...!'
            } else if (values.cpassword.includes(' ')) {
                errors.cpassword = 'Invalid Confirm Password'
            }

            // validation for password
            if (!values.password) {
                errors.password = 'Please enter your password'
            } else if (values.password.length < 8 || values.password.length > 20) {
                errors.password =
                    ' Must be greater then 8 and less then 20 characters long'
            } else if (values.password.includes(' ')) {
                errors.password = 'Invalid Password'
            }

            // validation for designation
            if (!values.name) {
                errors.name = 'Please enter your name'
            } else if (values.name.length < 3 || values.name.length > 20) {
                errors.name = 'Must be greater then 3 and less then 20 characters long'
            }

            return errors
        },

        onSubmit
    })
    async function onSubmit(values) {
        let firstName = values.name.split(' ')[0]
        let lastName = values.name.split(' ').slice(1).join(' ')
        console.log(lastName);
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                email: values.email,
                password: values.password
            })
        })
        if (res.ok) {
            const status = await signIn('credentials', {
                email: values.email,
                password: values.password,
                callbackUrl: '/'
            })

            if (status.status === 201) {
                router.push('/')
            } else if (status.status === 409) {
                setError(status.error)
            } else if (status.status === 500) {
                setError(status.error)
            }
        }
    }

    return (
        <FormikProvider value={formik}>
            <div className="mt-10 flex flex-col">
                <div className="mx-auto my-6 max-w-full sm:block">
                    <Image
                        className=""
                        src="svg/agenda.svg"
                        alt="agenda"
                        width={200}
                        height={200}
                    />
                    {/* </div> */}
                </div>

                <section className="w-full p-5">
                    <div className="mx-auto my-0 w-96 max-w-lg rounded-sm  bg-white py-[25px] px-[40px] shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)]">
                        <h1 className="mt-3 mb-4 text-center text-base font-semibold tracking-tight text-gray-500">
                            Sign Up for your account
                        </h1>
                        <div className="form-control ">
                            <form className="w-50 mt-0 block" onSubmit={formik.handleSubmit}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name*"
                                        className="mt-2 h-10 w-full rounded-sm border-2 border-gray-300 bg-gray-50 p-2 transition-all duration-500"
                                        {...formik.getFieldProps('name')}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-xs text-red-400">
                                            {formik.errors.name}
                                        </div>
                                    ) : null}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Email*"
                                    className="mt-2 h-10 w-full rounded-sm border-2 border-gray-300 bg-gray-50 p-2 transition-all duration-500"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-xs text-red-400">
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                                <input
                                    type="password"
                                    placeholder="Password*"
                                    className="my-2 h-10 w-full rounded-sm border-2 border-gray-300 bg-gray-50  p-2 transition-all  duration-500"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-xs text-red-400">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                                <input
                                    type="password"
                                    placeholder=" Confirm Password*"
                                    className="my-2 h-10 w-full rounded-sm border-2 border-gray-300 bg-gray-50  p-2 transition-all  duration-500"
                                    {...formik.getFieldProps('cpassword')}
                                />
                                {formik.touched.cpassword && formik.errors.cpassword ? (
                                    <span className="text-xs text-red-400">
                                        {formik.errors.cpassword}
                                    </span>
                                ) : null}
                                <button className="my-2 h-10 w-full rounded-md bg-emerald-400 font-bold text-gray-100">
                                    Sign Up
                                </button>
                            </form>
                            <div className="divider my-4 h-1"></div>
                            <div className="mx-10 inline text-sm text-gray-400">
                                Already have an account?{' '}
                                <RxDotFilled className="inline text-gray-800" />{' '}
                                <Link className="text-blue-400 hover:underline" href={'/login'}>
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <div>
                    <Image
                        src="svg/checklist.svg"
                        alt="image1"
                        className="absolute top-[-6.7px] left-14  -z-10  hidden scale-y-[-1] scale-x-[-1] md:hidden lg:block"
                        width={400}
                        height={500}
                    />
                    <Image
                        src="svg/business.svg"
                        alt="image2"
                        className="absolute bottom-0 right-0 -z-10 hidden lg:block"
                        width={500}
                        height={600}
                    />
                </div>
            </div>
        </FormikProvider>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    // if (session) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false
    //     }
    //   }
    // }
    return {
        props: {
            providers: await getProviders(context)
        }
    }
}

export default Signup
