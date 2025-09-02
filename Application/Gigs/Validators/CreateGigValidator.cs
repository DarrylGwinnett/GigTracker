using Application.Commands;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gigs.Validators
{
    public class CreateGigValidator : AbstractValidator<CreateGig.Command>
    {
        public CreateGigValidator()
        {
            RuleFor(x => x.gigDto.Title).NotEmpty().WithMessage("Title is required.");
            RuleFor(x => x.gigDto.Artist).NotEmpty().WithMessage("Artist is required.");
            RuleFor(x => x.gigDto.Date).NotEmpty().WithMessage("Date is required.");
            RuleFor(x => x.gigDto.Date).GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future.");
            RuleFor(x => x.gigDto.Description).NotEmpty().WithMessage("Description is required.");
            RuleFor(x => x.gigDto.Category).NotEmpty().WithMessage("Category is required.");
            RuleFor(x => x.gigDto.City).NotEmpty().WithMessage("City is required.");
            RuleFor(x => x.gigDto.Venue).NotEmpty().WithMessage("Venue is required.");
        }
    }
}
