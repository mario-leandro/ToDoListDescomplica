"use client";
import { useState, useEffect } from "react";
import { Card, TableContainer, Paper, Table, TableHead, TableRow, TableBody, CardHeader, CardContent, TableCell, CardActions, Button, Modal } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CriarTarefa from "@/pages/CriarTarefa";
import EditarTarefa from "@/pages/EditarTarefa";

function createData(
    idTarefa,
    tituloTarefa,
    descricaoTarefa,
    inicioTarefa,
    fimTarefa,
    statusTarefa,
    recursoTarefa,
)  {
    return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, recursoTarefa, statusTarefa, recursoTarefa };
}

const initialRows = [
    createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Recurso 1', 'Concluída', 'Recurso 1'),
    createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Recurso 2', 'Em Andamento', 'Recurso 2'),
    createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-05', '2022-01-06', 'Recurso 3', 'Em Andamento', 'Recurso 3'),
    createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-07', '2022-01-08', 'Recurso 4', 'Em Andamento', 'Recurso 4'),
    createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-09', '2022-01-10', 'Recurso 5', 'Em Andamento', 'Recurso 5'),
    createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-11', '2022-01-12', 'Recurso 6', 'Aguardando', 'Recurso 6'),
];

const ListarTarefa = () => {
    const [open, setOpen] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefa, setTarefa] = useState();
    const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEditar = () => setOpenEditar(true);
    const handleCloseEditar = () => setOpenEditar(false);

    useEffect(() => {
        setTarefas(initialRows);
    }, []);

    const handleEditar = (id) => {
        setIdTarefaSelecionada(id);

        let tarefaParaEditar = tarefas.filter(obj => {
            return obj.idTarefa === id;
        })[0];

        setTarefa(tarefaParaEditar);

        setOpenEditar(true);
    };

    const handleDeletar = (id) => {
        setTarefas(current =>
            current.filter(tarefa => {
                return tarefa.idTarefa !== id;
            }),
        );
    };

    return (
        <>
            <Card>
                <CardHeader 
                    title="Tarefas" 
                    subheader="Listagem de Tarefas" 
                />

                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead sx={{ 
                                bgcolor: '#4527a0',
                             }}>
                                <TableRow>
                                    <TableCell sx={{ color: '#fff' }} align="center">ID</TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center">Título</TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center">Descrição</TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center">Data de Início</TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center">Data de Finalização</TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center">Status</TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center">Recurso</TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center"></TableCell>
                                    <TableCell sx={{ color: '#fff' }} align="center"></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {tarefas.map((row, indice) => (
                                    <TableRow
                                        key={indice.idTarefa}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row" align="center">
                                            {row.idTarefa}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {row.tituloTarefa}
                                        </TableCell>
                                        <TableCell align="center">{row.descricaoTarefa}</TableCell>
                                        <TableCell align="center">{row.inicioTarefa}</TableCell>
                                        <TableCell align="center">{row.fimTarefa}</TableCell>
                                        <TableCell align="center">{row.recursoTarefa}</TableCell>
                                        <TableCell align="center">{row.statusTarefa}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><DeleteIcon fontSize="small" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions sx={{ marginLeft: '8px' }}>
                    <Button size="small" variant="contained" sx={{ background: '#4527a0' }} onClick={handleOpen}>Criar Tarefa</Button>
                    <Button size="small" variant="outlined">Cancelar</Button>
                </CardActions>
            </Card>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
                    </div>
                </Modal>
            </div>
            <div>
                <Modal
                    open={openEditar}
                    onClose={handleCloseEditar}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <EditarTarefa handleClose={handleCloseEditar} tarefas={tarefas} setTarefas={setTarefas} tarefa={tarefa} />
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default ListarTarefa;