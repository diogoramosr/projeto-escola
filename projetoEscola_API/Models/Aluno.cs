using System;
using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Aluno
    {
        public int id { get; set; }

        // [Display(Name = "RA")]
        [StringLength(5)]
        [Required(ErrorMessage = "O campo RA é obrigatório")]
        // [RegularExpression(@"^[0-9]{5}$", ErrorMessage = "O campo RA deve conter 5 números.")]
        public string? ra { get; set; }

        // [Display(Name = "Nome")]
        [StringLength(30, MinimumLength = 3)]  
        [Required(ErrorMessage = "O campo nome é obrigatório")]
        // [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$", ErrorMessage = "Números e caracteres especiais não são permitidos no nome.")]
        public string? nome { get; set; }

        // [Display(Name = "Código do Curso")]
        // [MaxLlenght(2)]
        [Required(ErrorMessage = "O campo Código do curso é obrigatório")]
        public int codCurso { get; set; }
    }
}