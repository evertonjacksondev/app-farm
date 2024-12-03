import styled from "styled-components";
import { useProviderGlobal } from "../../context/global.context";
import { TextField } from "../molecules/TextField";
import { ModalBar } from "../molecules/ModalBar";
import { IconButton } from "../molecules/IconButton";
import { FarmRequest } from "../../Http/request/FarmRequest";
import { useSnackbar } from "notistack";
import { CreateFarmDto } from "../../Http/dto/Farm-dto";
import { SelectField } from "../molecules/SelectField";
import { useForm, Controller } from "react-hook-form";
import ufData from '../../db/UF.json';


const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
  display: flex;
  z-index:1200;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const ModalContainerListItems = styled.div`
  overflow:hidden;
  display:flex;
  gap:5px;
  background:white;
  justify-content:center;
  flex-direction:column;
  border-radius:8px;
`;

const ModalListItems = styled.div`
  max-width:800px;
  justify-content:center;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  width:50vw;
  background:white;
`;

const ModalListItemsButton = styled.div`
  max-width:800px;
  display:flex;
  flex-direction:row;
  justify-content: center;
  flex-wrap:wrap;
  gap:5px;
  width:50vw;
  background:white;
  padding:10px;
`;

const ModalItem = styled.div`
  width:250px;
  display:flex;
  flex-direction:column;
  margin:5px;
`;

const ModalItemButton = styled.div`
  border-radius:8px;
  justify-content:center;
  display:flex;
  width:250px;
  height:75px;
  flex-direction:row;
`;

const ItemButton = styled.div`
  border-radius:8px;
  justify-content:center;
  display:flex;
`;

interface IModalHomeFarmProps {
  selectValues: any
  handleRefresh:()=>void
}

export const ModalHomeFarm = ({ handleRefresh,selectValues }: IModalHomeFarmProps) => {
  const { isActiveModalFarm = false, setIsActiveModalFarm, isActiveModalProducer, setIsActiveModalProducer } = useProviderGlobal();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateFarmDto>();

  if (!isActiveModalFarm) return null;

  const onSubmit = async (data: CreateFarmDto) => {
    try {
      const farmRequest = new FarmRequest();

      await farmRequest.createFarm(data);
      enqueueSnackbar('Fazenda Criada!', { variant: 'success' });
      handleRefresh()
      handleClose();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
      handleClose();
    }
  };

  const handleClose = () => {
    setIsActiveModalFarm(false);
    reset();
  };

  return (
    <ModalContainer>
      <ModalContainerListItems>
        <ModalBar iconName='add' name="Cadastrar Fazenda" />
        <ModalListItems>
          <ModalItem>
            <Controller
              name="producerId"
              control={control}
              rules={{ required: "Produtor é obrigatório" }}
              render={({ field }: any) => (
                <SelectField
                  {...field}
                  type="number"
                  option={selectValues.map((value:any)=> {return { id:value.key,name:value.key,value:value.name}})}
                  placeHolder="Produtor"
                  error={errors.producerId}
                />
              )}
            />
            <ModalItemButton>
              <ItemButton>
                <IconButton
                  isLoadingIcon={false}
                  label="Adicionar Produtor"
                  iconName="add"
                  onClick={() => setIsActiveModalProducer(!isActiveModalProducer)}
                />
              </ItemButton>
            </ModalItemButton>

            <Controller
              name="farmName"
              control={control}
              defaultValue=""
              rules={{ required: "Nome da Fazenda é obrigatório" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  placeHolder="Nome da Fazenda"
                  error={errors.farmName}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: "Endereço é obrigatório" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  placeHolder="Endereço"
                  error={errors.address}
                />
              )}
            />
          
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: "Telefone é obrigatório" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  placeHolder="Telefone"
                  error={errors.phone}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email é obrigatório" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  placeHolder="Email"
                  error={errors.email}
                />
              )}
            />
          </ModalItem>
          <ModalItem>
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
            <Controller
              name="city"
              control={control}
              rules={{ required: "Cidade é obrigatória" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  placeHolder="Cidade"
                  error={errors.city}
                />
              )}
            />
            
            <Controller
              name="number"
              control={control}
              rules={{ required: "Número é obrigatório" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  type="number"
                  placeHolder="Número"
                  error={errors.number}
                />
              )}
            />
            <Controller
              name="neighborhood"
              control={control}
              rules={{ required: "Bairro é obrigatório" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  placeHolder="Bairro"
                  error={errors.neighborhood}
                />
              )}
            />
            <Controller
              name="totalArea"
              control={control}
              rules={{ required: "Área total é obrigatória" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  type="number"
                  placeHolder="Área total em hectares"
                  error={errors.totalArea}
                />
              )}
            />
         
            <Controller
              name="arable"
              control={control}
              rules={{ required: "Área cultivável é obrigatória" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  type="number"
                  placeHolder="Área cultivável em hectares"
                  error={errors.arable}
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
