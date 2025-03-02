import React, { useCallback, useRef } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../../store/reducer/authSlice";
import { Modal, Group, TextInput, Button } from '@mantine/core';
import { useUpdateUserKOLTagsOptionsMutation } from "../../../../store/api/feelingApi";

const AddTagsKolModal = ({ opened, close, title, placeholder, type }) => {
    const textRef = useRef(null);
    const id = useSelector(selectCurrentUserId);
    const [updateUserKOLTags] = useUpdateUserKOLTagsOptionsMutation();

    const addHandler = useCallback(async () => {
        if (textRef.current.value === "") return;
        const data = { [type]: textRef.current.value };
        console.log(data);
        const result = await updateUserKOLTags({ id, type, data });
        close();
    }, [id, updateUserKOLTags, close]);

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