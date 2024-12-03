import { Table } from "antd"
import styled from "styled-components"
import { IconButton } from "../molecules/IconButton"
import { useProviderGlobal } from "../../context/global.context"

interface ITableProps {
    selectProducerValues:any
    columns: Array<any>
    dataSource: Array<any>
    handleRefresh: ()=> void
}

const ContainerTable = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:8px;
`
const ItemTable = styled.div`
width:1100px;

`
const ContainerItemTableButton = styled.div`
display:flex;
width:1100px;
gap:8px;
justify-content:flex-end;

`
const ItemButton = styled.div`


`
export const TableHome = ({ columns, dataSource }: ITableProps) => {
    const { isActiveModalFarm, setIsActiveModalFarm } = useProviderGlobal()
    const { isActiveModalProducer, setIsActiveModalProducer } = useProviderGlobal()
    const { isActiveModalAgriculture, setIsActiveModalAgriculture } = useProviderGlobal()

    return (
        <ContainerTable>
            <ContainerItemTableButton>
                <ItemButton>
                    <IconButton
                        iconName="add"
                        label="Adicionar Produtor"
                        isLoadingIcon={false}
                        onClick={() => setIsActiveModalProducer(!isActiveModalProducer)} />
                </ItemButton>
                <ItemButton>
                    <IconButton
                        iconName="add"
                        label="Adicionar Fazenda"
                        isLoadingIcon={false}
                        onClick={() => setIsActiveModalFarm(!isActiveModalFarm)} />
                </ItemButton>
                <ItemButton>
                    <IconButton
                        iconName="add"
                        label="Adicionar Cultivo"
                        isLoadingIcon={false}
                        onClick={() => setIsActiveModalAgriculture(!isActiveModalAgriculture)} />
                </ItemButton>
            </ContainerItemTableButton>
            <ItemTable>
                <Table components={{
                    header: {
                        cell: (props: any) => (
                            <th {...props} style={{ backgroundColor: '#33842b', color: 'white' }} />
                        ),
                    },
                }}
                    rowKey='id' columns={columns} dataSource={dataSource} />
            </ItemTable>
        </ContainerTable>

    )
}