# Generated by Django 3.2.7 on 2021-10-20 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_alter_society_staff_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='society_staff',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]