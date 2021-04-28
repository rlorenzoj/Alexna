<%@ Page Title="" Language="C#" MasterPageFile="~/Paginas/Principal.Master" AutoEventWireup="true" CodeBehind="CursosEscolares.aspx.cs" Inherits="Alexna.Paginas.CursosEscolares" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card mx-2">
        <h4 class="titulo">Curso Escolar</h4>
        <div class="container-fluid">
            <div class="row border border-dark rounded p-2 m-2">
                <div class="col-12">
                    <select class="js-example-basic-single" style="width: 100%;"  id="cursoEscolar"></select>
                </div>
            </div>
            <div class="row border border-dark rounded p-2 m-2 d-none" id="cajaOpciones">
                <div class="col-12">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-2">
                                <label for="fechaInicio">Fecha de inicio</label>
                            </div>
                            <div class="col-4">
                                <input type="text" class="form-control" id="fechaInicio" />
                            </div>

                            <div class="col-2">
                                <label for="fechaFin">Fecha de finalización</label>
                            </div>
                            <div class="col-4">
                                <input type="text" class="form-control" id="fechaFin" />
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-2">
                                <label for="asignaturas">Asignaturas</label>
                            </div>
                            <div class="col-10">
                                <select class="js-example-basic-multiple" style="width: 100%;" id="asignaturas" multiple="multiple"></select>
                            </div>
                        </div>

                        <div class="row">
                            <button type="button" class="btn btn-outline-danger">Cerrar curso</button>
                            <button type="button" class="btn btn-outline-dark ml-auto">Grabar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ScriptsPlaceHolder" runat="server">
    <script src="../Js/CursosEscolares.js"></script>
</asp:Content>
