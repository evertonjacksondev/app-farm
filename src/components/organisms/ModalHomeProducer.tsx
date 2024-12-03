import styled from "styled-components";
import { useProviderGlobal } from "../../context/global.context";
import { TextField } from "../molecules/TextField";
import { ModalBar } from "../molecules/ModalBar";
import { TextFieldMask } from "../molecules/TextFieldMask";
import ufData from '../../db/UF.json';
import documentType from '../../db/Document_type.json';
import { SelectField } from "../molecules/SelectField";
import { IconButton } from "../molecules/IconButton";
import { useEffect, useState } from "react";
import { ProducerDto } from "../../Http/dto/Producer-dto";
import { useSnackbar } from "notistack";
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { ProducerRequest } from "../../Http/request/ProducerRequest";
import { useForm, Controller } from "react-hook-form";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
  display: flex;
  z-index: 1200;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const ModalContainerListItems = styled.div`
  overflow: hidden;
  display: flex;
  gap: 5px;
  background: white;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
`;

const ModalListItems = styled.div`
  max-width: 800px;
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50vw;
  background: white;
`;

const ModalListItemsButton = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  width: 50vw;
  background: white;
  padding: 10px;
`;

const ModalItem = styled.div`
  width: 250px;
  margin: 5px;
`;

const ModalItemButton = styled.div`
  border-radius: 8px;
  justify-content: center;
  display: flex;
  width: 250px;
  flex-direction: row;
`;

interface IModalHomeProducerProps {
  handleRefresh: () => void;
}

export const ModalHomeProducer = ({ handleRefresh }: IModalHomeProducerProps) => {
  const { isActiveModalProducer = false, setIsActiveModalProducer, editProducer,setEditProducer } = useProviderGlobal();
  const { enqueueSnackbar } = useSnackbar();
  const [inputMask, setInputMask] = useState<string>("");

  const producerRequest = new ProducerRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProducerDto>({
    defaultValues: {
      city: '',
      document: '',
      document_type: '',
      name: '',
      UF: '',
      address: '',
      neighborhood: '',
      number: 0,
      phone: ''
    }
  });

  const documentTypeValue = watch('document_type');

  // Set the mask based on document type
  useEffect(() => {
    if (documentTypeValue === 'PF') {
      setInputMask('999.999.999-99'); // CPF mask
    } else if (documentTypeValue === 'PJ') {
      setInputMask('99.999.999/9999-99'); // CNPJ mask
    }
  }, [documentTypeValue]);

  // Set form values for editing
  useEffect(() => {
    if (editProducer) {
      console.log("Editando produtor:", editProducer); // Para depuração
      reset({
        city: editProducer.city || '',
        document: editProducer.document || '',
        document_type: editProducer.document_type || '',
        name: editProducer.name || '',
        UF: editProducer.UF || '',
        address: editProducer.address || '',
        neighborhood: editProducer.neighborhood || '',
        number: editProducer.number || 0,
        phone: editProducer.phone || ''
      });
    }
  }, [editProducer, reset]);

  if (!isActiveModalProducer) return null;

  const handleClosed = () => {
    setIsActiveModalProducer(false);
    reset({
      city: '',
      document: '',
      document_type: '',
      name: '',
      UF: '',
      address: '',
      neighborhood: '',
      number: 0,
      phone: ''
    });
  };

  const onSubmit = async (data: ProducerDto) => {
    try {
      if (editProducer) {
        // Update an existing producer
        await producerRequest.updateProducer(editProducer.id, data);
        setEditProducer("")
        enqueueSnackbar('Produtor atualizado com sucesso!', { variant: 'success' });
      } else {
        // Create a new producer
        await producerRequest.createProducer(data);
        enqueueSnackbar('Produtor criado com sucesso!', { variant: 'success' });
      }
      handleClosed();
      handleRefresh();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <ModalContainer>
      <ModalContainerListItems>
        <ModalBar iconName="add" name="Cadastrar Produtor Rural" />
        <ModalListItems>
          <ModalItem>
            <Controller
              name="document_type"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <SelectField
                  defaultValue=""
                  {...field}
                  placeHolder="Tipo de Pessoa"
                  error={errors.document_type}
                  option={documentType}
                />
              )}
            />
            <Controller
              name="document"
              control={control}
              rules={{
                required: '*Preenchimento Obrigatório*',
                validate: {
                  validateDocument: (value) => {
                    if (documentTypeValue === 'PF' && !cpf.isValid(value)) {
                      return 'CPF inválido';
                    }
                    if (documentTypeValue === 'PJ' && !cnpj.isValid(value)) {
                      return 'CNPJ inválido';
                    }
                    return true;
                  }
                },
              }}
              render={({ field }) => (
                <TextFieldMask
                  {...field}
                  mask={inputMask}
                  placeHolder="CPF ou CNPJ"
                  error={errors.document}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeHolder="Telefone"
                  error={errors.phone}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeHolder="Nome do produtor"
                  error={errors.name}
                />
              )}
            />
          </ModalItem>

          <ModalItem>
            <Controller
              name="city"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeHolder="Cidade"
                  error={errors.city}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeHolder="Endereço"
                  error={errors.address}
                />
              )}
            />
            <Controller
              name="neighborhood"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeHolder="Bairro"
                  error={errors.neighborhood}
                />
              )}
            />
            <Controller
              name="number"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeHolder="Número"
                  error={errors.number}
                />
              )}
            />
            <Controller
              name="UF"
              control={control}
              rules={{ required: '*Preenchimento Obrigatório*' }}
              render={({ field }) => (
                <SelectField
                  defaultValue=""
                  {...field}
                  placeHolder="UF"
                  error={errors.UF}
                  option={ufData}
                />
              )}
            />
          </ModalItem>
        </ModalListItems>

        <ModalListItemsButton>
          <ModalItemButton>
            <IconButton
              isLoadingIcon={false}
              label="Fechar"
              iconName="closed"
              onClick={handleClosed}
            />
          </ModalItemButton>
          <ModalItemButton>
            <IconButton
              isLoadingIcon={false}
              label="Salvar"
              iconName="save"
              onClick={handleSubmit(onSubmit)}
            />
          </ModalItemButton>
        </ModalListItemsButton>
      </ModalContainerListItems>
    </ModalContainer>
  );
};
