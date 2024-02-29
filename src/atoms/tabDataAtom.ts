import { atom } from "jotai"

interface tabData {
    activeFoot: boolean
}

export const tabDataAtom = atom<tabData>({ activeFoot: true })