<%@ Page Title="" Language="C#" MasterPageFile="~/Paginas/Principal.Master" AutoEventWireup="true" CodeBehind="Paises.aspx.cs" Inherits="Alexna.Paginas.Paises" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="jumbotron mx-2">
        <h4 class="titulo">Países</h4>
        <table id="tablaPrincipal" class="table table-striped table-bordered dt-responsive nowrap" style="width: 100%;">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Observaciones</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        </table>
    </div>

    <!-- #include virtual ="Modales/modalPaises.html" -->
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ScriptsPlaceHolder" runat="server">
    <script src="../Js/Paises.js"></script>
</asp:Content>
