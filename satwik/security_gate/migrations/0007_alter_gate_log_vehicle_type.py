# Generated by Django 3.2 on 2021-10-22 16:37

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('security_gate', '0006_auto_20211022_1836'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gate_log',
            name='vehicle_type',
            field=models.CharField(choices=[('2-wheeler', '2-wheeler'), ('4-wheeler', '4-wheeler')], default=django.utils.timezone.now, max_length=20, verbose_name='Vehicle type'),
            preserve_default=False,
        ),
    ]