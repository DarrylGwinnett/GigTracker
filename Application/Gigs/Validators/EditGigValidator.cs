using Application.Commands;
using Application.Gigs.DTO;
using FluentValidation;

namespace Application.Gigs.Validators
{
    public class EditGigValidator : BaseGigValidator<EditGig.Command, EditGigDto>
    {
        public EditGigValidator() : base(x=>x.GigDto)
        {
            RuleFor(x => x.GigDto.Id).NotEmpty().WithMessage("Gig ID is required.");
        }
    }
}
