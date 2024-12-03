import { Fragment, useEffect, useState } from "react";
import { ModalHomeProducer } from "../organisms/ModalHomeProducer";
import { TableHome } from "../organisms/TableHome";
import { IconButton } from "../molecules/IconButton";
import { Container } from "../atoms/Container";
import { Item } from "../atoms/Item";
import { DashBoards } from "../organisms/DashBoardHome";
import { ModalHomeFarm } from "../organisms/ModalHomeFarm";
import { ProducerRequest } from "../../Http/request/ProducerRequest";
import { message } from "antd";
import { ModalHomeAgriculture } from "../organisms/ModalHomeAgriculture";
import { FarmRequest } from "../../Http/request/FarmRequest";

export const Farm = () => {
    const [selectProducerValues, setSelectProducerValues] = useState([]);
    const [selectFarmValues, setSelectFarmValues] = useState([]);

    const [userValues, setUserValues] = useState([]);

    const producerRequest = new ProducerRequest();
    const farmRequest = new FarmRequest();


    useEffect(() => {
        loadProducers();
    }, []);

    const loadProducers = () => {
        producerRequest
            .getProducerList(1, 10)
            .then((response) => {
                const formattedData = response.data.map((producer: any) => ({
                    key: producer.id,
                    name: producer.name,
                    document: producer.document,
                    city: producer.city,
                    UF: producer.UF,
                }));


                setSelectProducerValues(formattedData)

            })
            .catch((error) => {
                console.error("Erro ao carregar lista de produtores:", error);
                message.error("Erro ao carregar produtores.");
            });

        farmRequest
            .listFarms(1, 10)
            .then((response) => {
                const formattedData = response.data.map((farm: any) => ({
                    key: farm.id,
                    name: farm.farmName,
                    arable: farm.arable,
                    email:farm.email,
                    UF: farm.UF,
                    totalArea: farm.totalArea,
                    ownerName: farm.producer.name
                }));

                setUserValues(formattedData);

                setSelectFarmValues(formattedData)

            })
            .catch((error) => {
                console.error("Erro ao carregar lista de produtores:", error);
                message.error("Erro ao carregar produtores.");
            });
    };

    const handleDelete = async (record: any) => {
        try {
            await farmRequest.deleteFarm(record.key);
            message.success(`Produtor ${record.name} excluído com sucesso.`);
            loadProducers();
        } catch (error) {
            console.error("Erro ao excluir produtor:", error);
            message.error("Erro ao excluir o produtor.");
        }
    };

    const columns = [
        {
            title: "Nome da Fazenda",
            dataIndex: "name",
            key: "name",
            width: "19%",
          
        },
        {
            title: "Nome do Produtor",
            dataIndex: "ownerName",
            key: "ownerName",
            width: "19%",
            align: 'center'
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "19%",
            align: 'center'
        },
        {
            title: "Area Agricultavel",
            dataIndex: "arable",
            key: "arable",
            width: "12%",
            align: 'center'
        },
        {
            title: "Area Total",
            dataIndex: "totalArea",
            key: "totalArea",
            width: "12%",
            align: 'center'
        },
        {
            title: "UF",
            dataIndex: "UF",
            key: "UF",
            width: "5%",
            align: 'center'
        },
        {
            title: "Ações",
            dataIndex: "action",
            key: "action",
            align: 'center',
            width: "12%",
            render: (_: any, record: any) => {
                return (
                    <Fragment>
                        <Container>
                            <Item>
                                <IconButton
                                    isLoadingIcon={false}
                                    tooltipTitle="Excluir Fazenda"
                                    iconName="delete"
                                    background="#970505"
                                    onClick={() => handleDelete(record)}
                                />
                            </Item>
                        </Container>
                    </Fragment>
                );
            },
        },
    ];

    return (
        <Fragment>
            <DashBoards selectProducerValues={selectProducerValues} />
            <ModalHomeFarm handleRefresh={loadProducers} selectValues={selectProducerValues} />
            <ModalHomeProducer handleRefresh={loadProducers} />
            <ModalHomeAgriculture handleRefresh={loadProducers} selectValues={selectFarmValues} />
            <TableHome selectProducerValues={selectProducerValues}  handleRefresh={loadProducers} columns={columns} dataSource={userValues} />
        </Fragment>
    );
};
