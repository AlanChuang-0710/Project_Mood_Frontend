import React, { useCallback, useRef } from 'react';
import { Modal, Group, TextInput, Button } from '@mantine/core';

const AddTagsKolModal = ({ opened, close, title, placeholder }) => {
    const textRef = useRef(null);

    const addHandler = useCallback(() => {
        console.log(textRef.current.value);
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