import React, { useCallback, useRef } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../store/reducer/authSlice";
import { Modal, Group, TextInput, Button } from '@mantine/core';
import { useUpdateUserKOLTagsOptionsMutation } from "../../../../store/api/feelingApi";

const AddTagsKolModal = ({ opened, close, title, placeholder }) => {
    const textRef = useRef(null);
    const id = useSelector(selectCurrentUserId);
    const [updateUserKOLTags] = useUpdateUserKOLTagsOptionsMutation();
    const addHandler = useCallback(async (type) => {
        if (textRef.current.value === "") return;
        const data = { type: textRef.current.value };
        const result = await updateUserKOLTags(id, type, data);
        close();
    }, []);

    return (
        <>
            <Modal opened={opened} onClose={close} title={title} centered>
                <Group align="flex-end">
                    <TextInput
                        ref={textRef}
                        data-autofocus placeholder={placeholder} style={{ flex: 1 }} />
                    <Button onClick={addHandler}>Add</Button>
                </Group>
            </Modal>
        </>

    );
};

export default AddTagsKolModal;;