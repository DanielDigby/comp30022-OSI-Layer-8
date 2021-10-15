import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./editNote.module.css";

/* Need AnimatePresence because we still need the dom nodes after we close the animated note */
import { motion, AnimatePresence } from "framer-motion";

const EditNote = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false),
            check: () => {
                return open;
            },
        };
    });

    // api call
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className={styles.backdrop}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.25,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            delay: 0.2,
                        },
                    }}
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        className={styles.editNoteWrapper}
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                            transition: {
                                duration: 0.25,
                            },
                            x: 0,
                            y: 0,
                        }}
                        exit={{
                            scale: 0,
                            transition: {
                                delay: 0.2,
                            },
                        }}
                    >
                        <motion.div
                            className={styles.editNoteContent}
                            initial={{
                                x: 150,
                                opacity: 0,
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.25,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                x: 150,
                                transition: {
                                    duration: 0.25,
                                },
                            }}
                        >
                            insert note to render here
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
/* I have no idea why we need this */
EditNote.displayName = "EditNote";
export default EditNote;
