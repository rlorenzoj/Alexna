<%@ Page Title="" Language="C#" MasterPageFile="~/Paginas/Principal.Master" AutoEventWireup="true" CodeBehind="Personas.aspx.cs" Inherits="Alexna.Paginas.Personas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="jumbotron mx-2">
        <h4 class="titulo">Personas</h4>
        <table id="tablaPrincipal" class="table table-striped table-bordered dt-responsive nowrap" style="width: 100%;">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Identificación</th>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido 1</th>
                    <th>Apellido 2</th>
                    <th>Alias</th>
                    <th>Sexo</th>
                    <th>Nacimiento</th>
                    <th>Muerte</th>
                    <th>Observaciones</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        </table>
    </div>

    <!-- #include virtual ="Modales/modalPersonas.html" -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptsPlaceHolder" runat="server">
    <script src="../Js/Personas.js"></script>
</asp:Content>
