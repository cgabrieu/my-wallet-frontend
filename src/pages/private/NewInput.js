import { useState } from 'react';
import View from '../../components/View';
import TitlePage from '../../components/TitlePage';
import FormButton from '../../components/Form/FormButton';
import Input from '../../components/Form/Input';
import Form from '../../components/Form/Form';

export default function NewInput() {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');

    function submit(event) {
		event.preventDefault();
	}

    return (
        <View>
            <TitlePage>
                Nova Entrada
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
                <FormButton>Salvar Entrada</FormButton>
            </Form>
        </View>
    )
};