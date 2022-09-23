import { atom } from "recoil"

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


export const authAtom = atom({
    key: "AuthAtom",
    default: {
        token: null,
        user: null,
    },
    effects_UNSTABLE: [persistAtom],
})