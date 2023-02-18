
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 10,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "bulk"
}


// Regras adicionais para o orçamento:

// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.

// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.

// 3. A embalagem unitária tem um custo de 0.15 por unidade

// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo: 
    // faixa 1: acima de 1.000 - Desconto de 15%
    // faixa 2: acima de 500 - Desconto de 10%
    // faixa 3: acima de 100 - Desconto de 5%



// Resolução do desafio:
//inicia o codigo dentro da funcao ready logo a baixo
$(function(){
    //criado uma funcao atualizar orcamento  com um parametro chamado parametro
   function atualizar_orcamento(parametros){

    //mostrar o refresh loader ao atualizar a pagina
    $(".refresh-loader").show();

   // atribuimos o paramentro com notacao ponto para pegar a quantidade e alocamos na variavel quantidade
   var quantidade = parametros.quantidade;
   //criou uma variavel preco unitario que recebe o objeto camisetas e o paramentro percorrerar ate encontrar a cor, a gola,e a estampa neste onjeto 
   var preco_unit = camisetas[parametros.cor] [parametros.gola] [parametros.estampa].preco_unit;
   //criou uma variavel foto  que recebe o caminho no objeto camisetas ate chegar ao valor foto
   var foto = "img/"+ camisetas[parametros.cor][parametros.gola][parametros.estampa].foto;

   //soma do valor total quantidade multiplicado por preco unitario
   var valor_total = quantidade * preco_unit;
   //atribuindo valores em cima dos detalhes exclusive do produto
   //se a qualidade for igual ao material q190 o valor total sera multiplicado por 1.12%
   if(parametros.qualidade == "q190"){
    valor_total *= 1.12;
    //se a embalagem for igual a unitaria adiciona 15 centavos ao valor total
   }
   if(parametros.embalagem == "unitaria"){
    valor_total += (quantidade * 0.15);
   }


    //aplicando os descontos
    //se a quantidade for maior ou igual a mil unidades , aplicar um desconto de 15%
    if(quantidade >= 1000){
        valor_total *= 0.85;
    //se a quantidade for maior ou igual a quinhentas unidades , aplicar um desconto de 10%
    }else if(quantidade >= 500){
        valor_total *= 0.90;
    //se a quantidade for maior ou igual a cem unidades , aplicar um desconto de 5%
    }else if(quantidade >=100){
        valor_total *= 0.95;
    }

    window.setTimeout(function(){
        var id_gola = "#"+parametros.gola;
        $("#result_gola").html($(id_gola).html());

        var id_estampa = "option[value='"+parametros.estampa+"']";
        $("#result_estampa").html($(id_estampa).html());

        var id_qualidade = "#"+parametros.qualidade;
        $("#result_qualidade").html($(id_qualidade).html());

        var id_cor = "#"+parametros.cor
        $("#result_cor").html($(id_cor).html())

        var id_embalagem = "option[value='"+parametros.embalagem+"']";
        $("#result_embalagem").html($(id_embalagem).html());

       
        $("#result_quantidade").html(parametros.quantidade);

        
        $("#valor-total").html(valor_total.toLocaleString('pt-BR',{minimumFractionDigits:2, maximumFractionDigits:2}));
        $("#foto-produto").attr("src",foto)
    
        $(".refresh-loader").hide();
    },450)

   }

   function atualizar_campos(parametros){
    $("#cor").children().removeClass("selected");
    var id_cor = "#"+ parametros.cor;
    $(id_cor).addClass("selected");

    $("#gola").children().removeClass("selected");
    var id_gola = "#"+ parametros.gola;
    $(id_gola).addClass("selected");

    $("#qualidade").children().removeClass("selected");
    var id_qualidade = "#"+ parametros.qualidade;
    $(id_qualidade).addClass("selected");

    $("#estampa").val(parametros.estampa);

    $("#embalagem").val(parametros.embalagem);

    $("#quantidade").val(parametros.qualidade);

   }

   function atualizar_locastorage(parametros){
        window.localStorage.setItem("quantidade",parametros.quantidade);
        window.localStorage.setItem("cor",parametros.cor);
        window.localStorage.setItem("gola",parametros.gola);
        window.localStorage.setItem("qualidade",parametros.qualidade);
        window.localStorage.setItem("estampa",parametros.estampa);
        window.localStorage.setItem("embalagem",parametros.embalagem);
   }



   $(".option-filter div").click(function(){

    $(this).parent().children("div").removeClass("selected");
    $(this).addClass("selected");

    var categoria = $(this).parent().attr('id');
    parametros_pesquisa[categoria] = $(this).attr("id");
    atualizar_locastorage(parametros_pesquisa);
    atualizar_orcamento(parametros_pesquisa);
});

$("select").change(function(){
    var paramentro_select = $(this).attr('id');
    parametros_pesquisa[paramentro_select] = $(this).val();
    atualizar_locastorage(parametros_pesquisa);
    atualizar_orcamento(parametros_pesquisa);
})
$("#quantidade").change(function(){
    var paramentro_input = $(this).attr('id');
    parametros_pesquisa[paramentro_input] = $(this).val();
    atualizar_locastorage(parametros_pesquisa);
    atualizar_orcamento(parametros_pesquisa);
})

if(window.localStorage["quantidade"]){
    parametros_pesquisa.quantidade = parseInt(window.localStorage["quantidade"]);
};

if(window.localStorage["cor"]){
    parametros_pesquisa.cor = window.localStorage["cor"];
};

if(window.localStorage["gola"]){
    parametros_pesquisa.gola= window.localStorage["gola"];
};

if(window.localStorage["qualidade"]){
    parametros_pesquisa.qualidade = window.localStorage["qualidade"];
};

if(window.localStorage["estampa"]){
    parametros_pesquisa.estampa = window.localStorage["estampa"];
};
if(window.localStorage["embalagem"]){
    parametros_pesquisa.embalagem = window.localStorage["embalagem"];
};

atualizar_campos(parametros_pesquisa);
atualizar_orcamento(parametros_pesquisa);
});



