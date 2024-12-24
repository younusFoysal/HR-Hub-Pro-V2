import React from 'react';

const CallToAction = () => {
    return (
        <div>
            <div className="h-screen w-screen bg-green-900 ">

                <div className="relative pt-20">
                    <div aria-hidden="true" className="hidden sm:block">
                        <div className="absolute inset-y-0 left-0 w-1/2 bg-green-800 rounded-r-3xl">
                        </div>
                        <svg className="absolute top-8 left-1/2 -ml-3" width="404" height="392" fill="none"
                             viewBox="0 0 404 392">
                            <defs>
                                <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20"
                                         patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" className="text-gray-200"
                                          fill="currentColor"></rect>
                                </pattern>
                            </defs>
                            <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"></rect>
                        </svg>
                    </div>
                    <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 transition duration-500 hover:-translate-y-3 hover:shadow-xl">
                        <div
                            className="relative rounded-2xl px-6 py-10 bg-green-500 overflow-hidden shadow-xl sm:px-12 sm:py-20">
                            <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                                <svg
                                    className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                                    <path className="text-gray-600 text-opacity-40" fill="currentColor"
                                          d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"></path>
                                    <path className="text-gray-800 text-opacity-40" fill="currentColor"
                                          d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"></path>
                                </svg>
                            </div>
                            <div className="relative flex flex-col">
                                <div className="sm:text-center">
                                    <h2 className="text-4xl font-semibold text-white tracking-tight sm:text-4xl">
                                        Push New Employees Work Updates
                                    </h2>
                                    <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-100">
                                        Get All the updates in your mail box
                                    </p>
                                </div>
                                <a href="/"
                                   className="transition hover:scale-110 w-auto inline-block mt-5 mx-auto rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-lime-500 sm:px-10">
                                    Subscribe Now →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CallToAction;