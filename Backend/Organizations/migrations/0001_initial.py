# Generated by Django 4.2 on 2023-05-01 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Organizations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('description', models.TextField()),
                ('number_of_workers', models.IntegerField()),
                ('company_address', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=50, unique=True)),
            ],
        ),
    ]