import FullScreenCardTemplate from '@templates/FullScreenCardTemplate';
import InscriptionHeader from '@organisms/headers/InscriptionHeader';
import FormInscription from '@organisms/forms/FormInscription';

import Text from '@atoms/Text';

const InscriptionPage = () => {

    return (
        <FullScreenCardTemplate>
            <InscriptionHeader direction="right" />

            <Text
                variant="error"
                color="error"
                className="my-6"
            >
                Los campos con asterisco (*) son obligatorios.
            </Text>

            <FormInscription />

        </FullScreenCardTemplate>
    )

}

export default InscriptionPage;