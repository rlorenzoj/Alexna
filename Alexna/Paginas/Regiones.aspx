<%@ Page Title="" Language="C#" MasterPageFile="~/Paginas/Principal.Master" AutoEventWireup="true" CodeBehind="Regiones.aspx.cs" Inherits="Alexna.Paginas.Regiones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card mx-2">
        <h4 class="titulo">Regiones</h4>
        <div class="container-fluid">
            <table id="tablaPrincipal" class="table table-striped table-bordered dt-responsive nowrap" style="width: 100%;">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>País</th>
                        <th>Nombre</th>
                        <th>Observaciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>

    <!-- #include virtual ="Modales/modalRegiones.html" -->
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ScriptsPlaceHolder" runat="server">
    <script src="../Js/Regiones.js"></script>
</asp:Content>
