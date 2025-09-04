using Application.Gigs.DTO;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gigs.Validators
{
    public class BaseGigValidator<T, TDto> : AbstractValidator<T>
        where TDto : BaseGigDto
    {
        public BaseGigValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).Title).NotEmpty().WithMessage("Title is required.").MaximumLength(100);
            RuleFor(x => selector(x).Artist).NotEmpty().WithMessage("Artist is required.").MaximumLength(100);
            RuleFor(x => selector(x).Date).NotEmpty().WithMessage("Date is required.");
            RuleFor(x => selector(x).Date).GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future.");
            RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required.").MaximumLength(500);
            RuleFor(x => selector(x).Category).NotEmpty().WithMessage("Category is required.").MaximumLength(30);
            RuleFor(x => selector(x).City).NotEmpty().WithMessage("City is required.").MaximumLength(30);
            RuleFor(x => selector(x).Venue).NotEmpty().WithMessage("Venue is required.").MaximumLength(50);
            RuleFor(x => selector(x).Latitude).InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90.");
            RuleFor(x => selector(x).Longitude).InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180.");
        }

    }
}
