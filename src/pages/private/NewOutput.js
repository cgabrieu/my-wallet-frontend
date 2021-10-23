import styled from 'styled-components';
import { IoMdExit, IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';

import { useState } from 'react';
import View from '../../components/View';
import TitlePage from '../../components/TitlePage';
import FormButton from '../../components/Form/FormButton';
import Input from '../../components/Form/Input';
import Form from '../../components/Form/Form';


export default function NewOutput() {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');

    function submit(event) {
		event.preventDefault();
	}

    return (
        <View>
            <TitlePage>
                Nova Saída
            </TitlePage>
            <Form onSubmit={submit}>
                <Input
                    placeholder="E-mail"
                    type="email"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <Input
                    placeholder="Senha"
                    type="password"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <FormButton>Salvar Saída</FormButton>
            </Form>
        </View>
    )
};