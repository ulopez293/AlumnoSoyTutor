'use client'

import { Footer } from 'flowbite-react'
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { SiTiktok } from "react-icons/si"

export const Pie = () => {
    return (
        <Footer container className="pt-14 pb-24 pr-20 pl-20 bg-footer-image bg-cover bg-center">
            <div className="w-full text-white font-semibold">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className="mr-5 mb-5">
                        <img src="https://res.cloudinary.com/econsulo/image/upload/v1660273296/Empresas/logo_p.png" alt="Logo" />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="Nosotros" className="text-white font-bold" />
                            <p className='mb-3 text-sm'>Monterrey, N.L. México</p>
                            <Footer.LinkGroup col className="text-white font-medium">
                                <Footer.Link href="mailto:ayuda@soytutor.io">ayuda@soytutor.io</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" className="text-white font-bold" />
                            <Footer.LinkGroup col className="text-white font-medium">
                                <Footer.Link href="https://soytutor.io/aviso-de-privacidad/" target='_blank'>Política de Privacidad</Footer.Link>
                                <Footer.Link href="https://soytutor.io/terminos-condiciones/" target='_blank'>Términos &amp; Condiciones</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright by="SoyTutor™" year={new Date().getFullYear()} className="text-white font-semibold mb-8 ml-26" />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center mr-10">
                        <Footer.Icon href="https://www.facebook.com/soytutor.io"  target='_blank' icon={BsFacebook as React.FC<React.SVGProps<SVGSVGElement>>} className="text-white font-semibold" />
                        <Footer.Icon href="https://www.instagram.com/soytutor.io"  target='_blank' icon={BsInstagram as React.FC<React.SVGProps<SVGSVGElement>>} className="text-white font-semibold" />
                        <Footer.Icon href="https://www.tiktok.com/@soytutor.io"  target='_blank' icon={SiTiktok as React.FC<React.SVGProps<SVGSVGElement>>} className="text-white font-semibold" />
                    </div>
                </div>
            </div>
        </Footer>
    )
}
