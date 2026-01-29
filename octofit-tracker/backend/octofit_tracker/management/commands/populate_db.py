from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Users
        users = [
            User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel),
            User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel),
            User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc),
            User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc),
        ]

        # Workouts
        pushups = Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='Strength')
        running = Workout.objects.create(name='Running', description='Run 5km', suggested_for='Endurance')

        # Activities
        Activity.objects.create(user=users[0], type='pushups', duration=10, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='pushups', duration=15, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='running', duration=25, date=timezone.now().date())

        # Leaderboard
        Leaderboard.objects.create(user=users[0], score=200, rank=1)
        Leaderboard.objects.create(user=users[1], score=180, rank=2)
        Leaderboard.objects.create(user=users[2], score=170, rank=3)
        Leaderboard.objects.create(user=users[3], score=160, rank=4)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
