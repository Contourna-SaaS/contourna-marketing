import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import * as Yup from 'yup';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs"
import { useState } from 'react';
import { useReCaptcha } from 'next-recaptcha-v3';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ContactSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Full Name Too Short')
    .max(50, 'Full Name Too Long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  message: Yup.string()
    .max(500, 'Message Too Long')
});


interface Values {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}


export default function Contact() {

  const [formError, setFormError] = useState(false);
  const [formLabel, setFormLabel] = useState("Submit");
  const [success, setSucess] = useState(false);
  const { executeRecaptcha } = useReCaptcha();

  return (

    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
        <div className="relative bg-white shadow-xl">
          <h2 className="sr-only">Contact us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact information */}
            <div className="relative overflow-hidden bg-c-yellow py-10 px-6 sm:px-10 xl:p-12">
              <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
                <svg
                  className="absolute inset-0 h-full w-full"
                  width={343}
                  height={388}
                  viewBox="0 0 343 388"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                    fill="url(#linear1)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear1"
                      x1="254.553"
                      y1="107.554"
                      x2="961.66"
                      y2="814.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  width={359}
                  height={339}
                  viewBox="0 0 359 339"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                    fill="url(#linear2)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear2"
                      x1="192.553"
                      y1="28.553"
                      x2="899.66"
                      y2="735.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  width={160}
                  height={678}
                  viewBox="0 0 160 678"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                    fill="url(#linear3)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear3"
                      x1="192.553"
                      y1="325.553"
                      x2="899.66"
                      y2="1032.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-c-grey">Contact information</h3>
              <p className="mt-6 max-w-3xl text-base text-c-grey">
                Connect with one of our experts.

              </p>
              <dl className="mt-8 space-y-6">
                <dt>
                  <span className="sr-only">Phone number</span>
                </dt>
                <dd className="flex text-base text-c-grey">
                  <PhoneIcon className="h-6 w-6 flex-shrink-0 text-c-grey" aria-hidden="true" />
                  <span className="ml-3">+1 778-244-4118</span>
                </dd>
                <dt>
                  <span className="sr-only">Email</span>
                </dt>
                <dd className="flex text-base text-c-grey">
                  <EnvelopeIcon className="h-6 w-6 flex-shrink-0 text-c-grey" aria-hidden="true" />
                  <span className="ml-3">info@contourna.com</span>
                </dd>
              </dl>
              <ul role="list" className="mt-8 flex space-x-12">
                <li>
                  <a className="text-c-grey hover:opacity-75" href="#">
                    <span className="sr-only">Instagram</span>
                    <BsInstagram size={20} />
                  </a>
                </li>
                <li>
                  <a className="text-c-grey hover:opacity-75" href="#">
                    <span className="sr-only">Twitter</span>
                    <BsTwitter size={20} />
                  </a>
                </li>
                <li>
                  <a className="text-c-grey hover:opacity-75" href="#">
                    <span className="sr-only">FaceBook</span>
                    <BsFacebook size={20} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact form */}
            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
              <h3 className="text-lg font-medium text-gray-900">Send us a message</h3>


              <Formik
                validationSchema={ContactSchema}
                initialValues={{
                  fullName: '',
                  email: '',
                  phone: '',
                  message: '',
                }}
                onSubmit={async (
                  values: Values,
                  { setSubmitting }: FormikHelpers<Values>
                ) => {

                  setFormLabel("Submitting");
                  /* Then create a new FormData obj */
                  let formData = new FormData();

                  /* FormData requires name: id */
                  formData.append("Contourna Form", "contact",);

                  /* append input field values to formData */
                  for (let value in values) {
                    formData.append(value, values[value]);
                  }
                  const token = await executeRecaptcha("contactSubmit");
                  formData.append('g-recaptcha-response', token)
                  setSubmitting(true);
                  await fetch("https://getform.io/f/1ac05ed9-2b56-4584-9a3b-e28abeb449b2", {
                    method: "POST",
                    body: formData,
                    headers: {
                      "Accept": "application/json",
                    },
                  })
                    .then(response => {
                      console.log(response)
                      setSubmitting(false);
                      setSucess(true)
                      setFormLabel("Submit");
                    }
                    )
                    .catch(error => setFormError(true))
                }}
              >
                {({ errors, touched }) => (
                  <Form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">

                    <>
                      <div className="sm:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">Full name</label>
                        <div className="mt-1">
                          <Field
                            id="fullName"
                            name="fullName"
                            placeholder="Full name"
                            type="text"
                            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-c-yellow focus:ring-c-yellow"
                          />
                          {errors.fullName && touched.fullName ? (
                            <span className='text-red-600 font-medium text-sm mt-1'>{errors.fullName}</span>
                          ) : null}
                        </div>
                      </div>


                      <div>
                        <div className="mt-1">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                          <Field
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Email"
                            type="email"
                            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-c-yellow focus:ring-c-yellow"
                          />
                          {errors.email && touched.email ? (
                            <span className='text-red-600 font-medium text-sm mt-1'>{errors.email}</span>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                            Phone
                          </label>
                          <span id="phone-optional" className="text-sm text-gray-500">
                            Optional
                          </span>
                        </div>
                        <div className="mt-1">
                          <Field
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            placeholder="Phone"
                            type="tel"
                            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-c-yellow focus:ring-c-yellow"
                          />
                          {errors.phone && touched.phone ? (
                            <span className='text-red-600 font-medium text-sm mt-1'>{errors.phone}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex justify-between">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                            Message
                          </label>
                          <span id="message-max" className="text-sm text-gray-500">
                            Max. 500 characters
                          </span>
                        </div>
                        <div className="mt-1">
                          <Field
                            as="textarea"
                            id="message"
                            name="message"
                            autoComplete="message"
                            placeholder="Message"
                            className="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-c-yellow focus:ring-c-yellow"
                            aria-describedby="message-max"
                          />
                          {errors.message && touched.message ? (
                            <span className='text-red-600 font-medium text-sm mt-1'>{errors.message}</span>
                          ) : null}
                        </div>
                      </div>


                      <div className="sm:col-span-2 sm:flex sm:justify-end">
                        <button
                          type="submit"
                          className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-c-yellow px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-c-grey focus:outline-none focus:ring-2 focus:ring-c-yellow focus:ring-offset-2 sm:w-auto"
                        >
                          {formLabel}
                        </button>
                      </div>
                      {formError && (
                        <span className='text-red-600 font-medium text-sm mt-1'>Error Submitting Form</span>
                      )}
                      {success && (
                        <span className='text-c-yellow font-medium text-sm mt-1'>Thank you for your submission</span>
                      )}
                    </>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
