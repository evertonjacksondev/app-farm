import styled from "styled-components";
import { useProviderGlobal } from "../../context/global.context";
import { TextField } from "../molecules/TextField";
import { ModalBar } from "../molecules/ModalBar";
import { IconButton } from "../molecules/IconButton";
import { AgricultureRequest } from "../../Http/request/AgricultureRequest";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { SelectField } from "../molecules/SelectField";

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
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const ModalItemButton = styled.div`
  border-radius: 8px;
  justify-content: center;
  display: flex;
  width: 250px;
  height: 75px;
  flex-direction: row;
`;

interface IModalHomeAgricultureProps {
  handleRefresh: () => void;
    selectValues: any
}

export const ModalHomeAgriculture = ({
  handleRefresh,
  selectValues
}: IModalHomeAgricultureProps) => {
  const { setIsActiveModalAgriculture, isActiveModalAgriculture } =
    useProviderGlobal();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  if (!isActiveModalAgriculture) return null;
  const onSubmit = async (data: any) => {
    try {
      const agricultureRequest = new AgricultureRequest();

      await agricultureRequest.createAgriculture(data)
      handleRefresh();
      enqueueSnackbar("Agricultura Cadastrada!", { variant: "success" });
    
      handleClose();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
      handleClose();
    }
  };

  const handleClose = () => {
    setIsActiveModalAgriculture(false);
    reset();
  };

  return (
    <ModalContainer>
      <ModalContainerListItems>
        <ModalBar iconName="add" name="Cadastrar Cultura" />
        <ModalListItems>
          <ModalItem>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Fazenda é obrigatório" }}
              render={({ field }: any) => (
                <SelectField
                  {...field}
                  type="number"
                  option={[
                    { id: 1, name: 'Soja', value: 'Soja' },
                    { id: 2, name: 'Milho', value: 'Milho' },
                    { id: 3, name: 'Algodão', value: 'Algodão' },
                    { id: 4, name: 'Café', value: 'Café' },
                    { id: 5, name: 'Cana de Açúcar', value: 'Cana de Açúcar' }
                  ]}
                  placeHolder="Nome da Cultura Agrícola"
                  error={errors.farmId}
                />
              )}
            />
            <Controller
              name="areaUsed"
              control={control}
              rules={{ required: "Área utilizada é obrigatória" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  placeHolder="Área utilizada (em hectares)"
                  error={errors.areaUsed}
                />
              )}
            />

          </ModalItem>

          <ModalItem>
            <Controller
              name="farmId"
              control={control}
              rules={{ required: "Fazenda é obrigatório" }}
              render={({ field }: any) => (
                <SelectField
                  {...field}
                  type="number"
                  option={selectValues.map((value: any) => { return { id: value.key, name: value.key, value: `${value.name} ` } })}
                  placeHolder="Fazenda"
                  error={errors.farmId}
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
              onClick={handleClose}
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
