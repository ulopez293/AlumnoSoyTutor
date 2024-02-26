// import { atomWithStorage } from 'jotai/utils'

import { atom } from "jotai"

interface userData {
    login: boolean
    email: string
    id_user: number | null | undefined
}

export const userDataAtom = atom<userData>({ login: false, email: ``, id_user: null })