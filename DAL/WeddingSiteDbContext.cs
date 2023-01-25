using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using WeddingSite.BackEnd.DAL.Models;

namespace WeddingSite.BackEnd.DAL
{
    public class WeddingSiteDbContext : DbContext
    {
        public WeddingSiteDbContext(DbContextOptions<WeddingSiteDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Invitee>()
                        .HasMany(k => k.Guests)
                        .WithOne(k => k.Invitation);

            modelBuilder.Entity<Invitee>()
                        .HasIndex(p => new { p.LastName, p.FirstName })
                        .IsUnique();

            modelBuilder.Entity<Guest>()
                        .HasOne(k => k.Invitation)
                        .WithMany(k => k.Guests)
                        .HasForeignKey(k => k.InvitationRefId)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ActiveInvitee>()
                        .HasOne(k => k.Invitation)
                        .WithOne(k => k.ActiveInvitee)
                        .HasForeignKey<ActiveInvitee>(k => k.InvitationRefId)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BankingDetails>();

            base.OnModelCreating(modelBuilder);
        }

        public IQueryable<T> GetAll<T>(bool trackingChanges = false) where T : class
        {
            return trackingChanges ? Set<T>().AsTracking() : Set<T>().AsNoTracking();
        }

        public EntityEntry<T> Insert<T>(T entity) where T : class
        {
            return Set<T>().Add(entity);
        }

        public EntityEntry<T> Modify<T>(T entity) where T : class
        {
            return Set<T>().Update(entity);
        }

        public EntityEntry<T> Delete<T>(T entity) where T : class
        {
            return Set<T>().Remove(entity);
        }
    }
}