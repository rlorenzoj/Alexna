<%@ Page Title="" Language="C#" MasterPageFile="~/Paginas/Principal.Master" AutoEventWireup="true" CodeBehind="Festivos.aspx.cs" Inherits="Alexna.Paginas.Festivos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="jumbotron mx-2">
        <h4>Festivos</h4>
        <table id="tablaPrincipal">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Festivo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        </table>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptsPlaceHolder" runat="server">
    <script src="../Js/Festivos.js"></script>
</asp:Content>
