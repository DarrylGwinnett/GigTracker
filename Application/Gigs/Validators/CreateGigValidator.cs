using Application.Gigs.Commands;
using Application.Gigs.DTO;
using FluentValidation;

namespace Application.Gigs.Validators
{
    public class CreateGigValidator : BaseGigValidator<CreateGig.Command, CreateGigDto>
    {
        public CreateGigValidator() : base(x => x.GigDto)
        {
       
        }
    }
}
