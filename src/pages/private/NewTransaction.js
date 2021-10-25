import { useState } from 'react';
import View from '../../components/View';
import TitlePage from '../../components/TitlePage';
import FormButton from '../../components/Form/FormButton';
import Input from '../../components/Form/Input';
import Form from '../../components/Form/Form';
import { formatBRLInput } from '../../utils/formatCurrencies'
import { postNewTransaction } from '../../services/api/api';
import { useHistory } from 'react-router';


export default function NewTransaction({ user, type }) {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    function submit(event) {
        event.preventDefault();
        if (formatTransactionValue(value) === 0) {
            setErrorMessage("O valor precisa ser maior que zero.")
            return;
        }
		setIsLoading(true);
        postNewTransaction(formatTransactionValue(value), description, user.token)
            .then(() => {
                setIsLoading(false);
                history.push("/");
            }).catch(() => setIsLoading(false));
    }

    const formatTransactionValue = (value) => {
        const clearValue = value.replace("R$ ", "").replaceAll(".","").replaceAll(",", "");
        if (type === "Entrada") return parseInt(clearValue);
        else return parseInt(clearValue)*(-1);
    }

    return (
        <View>
            <TitlePage>
                Nova {type}
            </TitlePage>
            <Form onSubmit={submit}>
                <Input
                    required
                    placeholder="Valor"
                    type="text"
                    maxLength="13"
                    value={formatBRLInput(value)}
                    onChange={e => setValue(e.target.value)}
                />
                <Input
                    required
                    placeholder="Descrição"
                    type="text"
                    maxLength="20"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {errorMessage && (
					<span> {errorMessage} </span>
				)}
                <FormButton type="submit" isLoading={isLoading}>
                    Salvar {type}
                </FormButton>
            </Form>
        </View>
    )
};
