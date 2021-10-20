import { store } from "../../config/redux/store";
import { storage } from "../../config/firebase/config";
import { INote, INoteWithoutIds } from "../../interfaces/note";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    createNote,
    updateNote,
    deleteNote,
} from "../../config/redux/noteSlice";

export const createNoteAPI = (note: INoteWithoutIds): void => {
    store.dispatch(createNote(note));
};

export const updateNoteAPI = (note: INote): void => {
    store.dispatch(updateNote(note));
};

export const deleteNoteAPI = (note: INote): void => {
    store.dispatch(deleteNote(note));
};

export const uploadNoteImageAPI = async (
    note: INote,
    fileList: FileList | null
): Promise<void> => {
    if (!fileList) throw new Error("No file selected");

    if (fileList[0]) {
        const file = fileList[0];
        const fileType = file["type"];
        const validImageTypes = ["image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
            const fileRef = ref(storage, `images/${file.name}`);
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);

            if (!url) throw new Error("Failed upload");

            note.image = url;
            store.dispatch(updateNote(note));
        }
    }
};
